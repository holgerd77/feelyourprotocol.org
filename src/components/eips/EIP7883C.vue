<script setup lang="ts">
import { Common, Hardfork, Mainnet } from '@ethereumjs/common'
import { createEVM, getActivePrecompiles } from '@ethereumjs/evm'
import { bytesToHex, hexToBytes } from '@ethereumjs/util'
import { ref, type Ref } from 'vue'
import {
  byteToValueInput,
  isValidByteInputForm,
  preformatByteInputForm,
  toHex,
  toVal,
  valueToByteInput,
} from '../lib/byteFormUtils'
import PrecompileValueInput from '../precompiles/PrecompileValueInput.vue'

/**
 * Examples
 */
const example: Ref<string> = ref('')
interface Examples {
  [key: string]: [bigint, bigint, bigint]
}
const examples: Examples = {
  'rsa-random': [3n, 5n, 2n],
}

const selectExample = () => {
  if (example.value === '') {
    return
  }
  vals.value[3] = examples[example.value][0]
  vals.value[4] = examples[example.value][1]
  vals.value[5] = examples[example.value][2]
  value2ByteRun()
}

/**
 * Form values
 */
const vals: Ref<bigint[]> = ref([1n, 1n, 1n, 2n, 2n, 2n])
const lengthsMask: Ref<(bigint | undefined)[]> = ref([32n, 32n, 32n, undefined, undefined])

const byteLengths: Ref<bigint[]> = ref([])
const hexStrings: Ref<string[]> = ref([])
const data: Ref<string> = ref('')

/**
 * Computation results
 */
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

async function byte2ValueRun() {
  data.value = preformatByteInputForm(data.value)
  if (!isValidByteInputForm(data.value)) {
    return false
  }

  byteLengths.value[3] = toVal(data, 0, 32 * 2)
  byteLengths.value[4] = toVal(data, 64, 64 + 32 * 2)
  byteLengths.value[5] = toVal(data, 128, 128 + 32 * 2)

  byteToValueInput(data, vals, byteLengths, hexStrings)
  await run()
}

async function onByteInputFormChange() {
  example.value = ''
  await byte2ValueRun()
}

async function value2ByteRun() {
  valueToByteInput(vals, lengthsMask, byteLengths, hexStrings)

  data.value =
    toHex(byteLengths.value[3], 32 * 2) +
    toHex(byteLengths.value[4], 32 * 2) +
    toHex(byteLengths.value[5], 32 * 2) +
    hexStrings.value[3] +
    hexStrings.value[4] +
    hexStrings.value[5]

  await run()
}

async function onValueInputFormChange() {
  example.value = ''
  value2ByteRun()
}

await onValueInputFormChange()
</script>

<template>
  <div>
    <p class="text-right">
      <select v-model="example" @change="selectExample">
        <option disabled selected value="">Examples</option>
        <option value="rsa-random">RSA Random</option>
      </select>
    </p>

    <p>
      <textarea
        @input="onByteInputFormChange"
        rows="6"
        v-model="data"
        class="block w-full mb-3 font-mono text-sm text-slate-600 bg-gray-50 border border-blue-400 p-1"
      ></textarea>
    </p>

    <PrecompileValueInput title="B" :len="byteLengths[3]" :hex="hexStrings[3]">
      <input
        @input="onValueInputFormChange"
        v-model.number="vals[3]"
        class="text-right font-mono text-lg text-slate-600 bg-gray-50 border border-gray-300 p-1"
      />
    </PrecompileValueInput>

    <PrecompileValueInput title="E" :len="byteLengths[4]" :hex="hexStrings[4]">
      <input
        @input="onValueInputFormChange"
        v-model.number="vals[4]"
        class="text-right font-mono text-lg text-slate-600 bg-gray-50 border border-gray-300 p-1"
      />
    </PrecompileValueInput>

    <PrecompileValueInput title="M" :len="byteLengths[5]" :hex="hexStrings[5]">
      <input
        @input="onValueInputFormChange"
        v-model.number="vals[5]"
        class="text-right font-mono text-lg text-slate-600 bg-gray-50 border border-gray-300 p-1"
      />
    </PrecompileValueInput>

    <p class="mt-5">Gas: {{ gas }} | Result: {{ result }}</p>
  </div>
</template>
