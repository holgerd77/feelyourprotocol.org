<script setup lang="ts">
import { Common, Hardfork, Mainnet } from '@ethereumjs/common'
import { createEVM, getActivePrecompiles } from '@ethereumjs/evm'
import { bigIntToBytes, bigIntToHex, bytesToHex, hexToBigInt, hexToBytes } from '@ethereumjs/util'
import { ref, type Ref } from 'vue'
import { isValidByteInputForm, preformatByteInputForm } from './lib/inputUtils'
import PrecompileValueInput from './precompiles/PrecompileValueInput.vue'


const validByteInputForm: Ref<boolean> = ref(true)

const vals: Ref<bigint[]> = ref([1n, 1n, 1n, 2n, 2n, 2n])
const lengthMask: Ref<(bigint | undefined)[]> = ref([32n, 32n, 32n, undefined, undefined])

const byteLengths: Ref<bigint[]> = ref([])
const hexStrings: Ref<string[]> = ref([])
const data: Ref<string> = ref('')

const gas: Ref<bigint | undefined> = ref(BigInt(0))
const result: Ref<string> = ref('')

/**
 * EVM Initialization
 */
const common = new Common({ chain: Mainnet, hardfork: Hardfork.Prague })
const gasLimit = BigInt(5000000)

const evm = await createEVM({ common })
const modexp = getActivePrecompiles(common).get('0000000000000000000000000000000000000005')!

/**
 * Run the precompile
 */
async function run() {
  const callData = {
    data: hexToBytes(`0x${data.value}`),
    gasLimit,
    common,
    _EVM: evm,
  }
  const res = await modexp(callData)
  gas.value = res.executionGasUsed
  result.value = bytesToHex(res.returnValue)
}

function byteToValueInput() {
  data.value = preformatByteInputForm(data.value)
  validByteInputForm.value = isValidByteInputForm(data.value)
  if (!validByteInputForm.value) {
    return false
  }

  const from = (start: number, end: number) => {
    return hexToBigInt(`0x${data.value.substring(start, end)}`)
  }

  byteLengths.value[3] = from(0, 32 * 2)
  byteLengths.value[4] = from(64, 64 + 32 * 2)
  byteLengths.value[5] = from(128, 128 + 32 * 2)

  let start = 0
  for (let i=0; i < vals.value.length; i++) {
    const end = start + Number(byteLengths.value[i]) * 2
    hexStrings.value[i] = data.value.substring(start, end)
    vals.value[i] = from(start, end)
    start = end
  }
  return true
}

async function onByteInputFormChange() {
  const success = byteToValueInput()
  if (success) {
    await run()
  }
}

function valueToByteInput() {
  const p = (value: bigint, length: number) => {
    return bigIntToHex(value).substring(2).padStart(length, '0')
  }

  for (let i=0; i < vals.value.length; i++) {
    if (lengthMask.value[i] === undefined) {
      byteLengths.value[i] = BigInt(bigIntToBytes(vals.value[i]).byteLength)
    } else {
      byteLengths.value[i] = lengthMask.value[i]!
    }
    hexStrings.value[i] = p(vals.value[i], Number(byteLengths.value[i]) * 2)
  }

  data.value = p(byteLengths.value[3], 32 * 2) + 
    p(byteLengths.value[4], 32 * 2) +
    p(byteLengths.value[5], 32 * 2) +
    hexStrings.value[3] + hexStrings.value[4] + hexStrings.value[5]

  return true
}



async function onValueInputFormChange() {
  const success = valueToByteInput()
  if (success) {
    await run()
  }
}

valueToByteInput()
await run()

</script>

<template>
  <div>
    <p>
      <textarea @input="onByteInputFormChange" rows="6" v-model="data" 
        class="block w-full mb-3 font-mono text-sm text-slate-600 bg-gray-50 border border-blue-400 p-1"></textarea>
    </p>

    <PrecompileValueInput title="B" :len="byteLengths[3]" :hex="hexStrings[3]">
      <input @input="onValueInputFormChange" v-model.number="vals[3]" class="text-right font-mono text-lg text-slate-600 bg-gray-50 border border-gray-300 p-1">
    </PrecompileValueInput>

    <PrecompileValueInput title="E" :len="byteLengths[4]" :hex="hexStrings[4]">
      <input @input="onValueInputFormChange" v-model.number="vals[4]" class="text-right font-mono text-lg text-slate-600 bg-gray-50 border border-gray-300 p-1">
    </PrecompileValueInput>

    <PrecompileValueInput title="M" :len="byteLengths[5]" :hex="hexStrings[5]">
      <input @input="onValueInputFormChange" v-model.number="vals[5]" class="text-right font-mono text-lg text-slate-600 bg-gray-50 border border-gray-300 p-1">
    </PrecompileValueInput>
    
    <p class="mt-5">
      Gas: {{  gas }} | Result: {{  result }}
    </p>
  </div>


</template>
