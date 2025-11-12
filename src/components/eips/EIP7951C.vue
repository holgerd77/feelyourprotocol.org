<script setup lang="ts">
import { Hardfork } from '@ethereumjs/common'
import { type ExecResult } from '@ethereumjs/evm'
import { ref, type Ref } from 'vue'
import { dataToValueInput, isValidByteInputForm, valueToDataInput } from '../lib/byteFormUtils.js'
import PrecompileValueInput from '../precompiles/PrecompileValueInput.vue'
import { useRoute, useRouter } from 'vue-router'
import PrecompileResultC from '../precompiles/PrecompileResultC.vue'
import PrecompileExamplesC from '../precompiles/PrecompileExamplesC.vue'
import PrecompileDataInput from '../precompiles/PrecompileDataInput.vue'
import EIPC from './EIPC.vue'
import PoweredByC from './PoweredByC.vue'
import {
  runPrecompile,
  type BIGINT_5,
  type BIGINT_UNDEFINED_5,
  type Examples,
  type HEX_5,
} from '../lib/precompiles.js'
import { EIPs } from '@/views/lib/structure.js'

const eip = EIPs['eip-7951']

const data: Ref<string> = ref('')
const hexVals: Ref<HEX_5> = ref(Array(5).fill('') as HEX_5)
const bigIntVals: Ref<BIGINT_UNDEFINED_5> = ref(Array(5).fill(undefined) as BIGINT_UNDEFINED_5)

const lengthsMask: Ref<BIGINT_UNDEFINED_5> = ref([32n, 32n, 32n, 32n, 32n])
const byteLengths: Ref<BIGINT_5> = ref(Array(5).fill(0n) as BIGINT_5)

const example: Ref<string> = ref('')

const execResultPre: Ref<ExecResult | undefined> = ref()
const execResultPost: Ref<ExecResult | undefined> = ref()

const poweredBy = ref([
  {
    name: 'Noble Curves',
    href: 'https://github.com/paulmillr/noble-curves',
  },
  {
    name: 'EthereumJS',
    href: 'https://github.com/ethereumjs/ethereumjs-monorepo',
  },
])

const router = useRouter()
const route = useRoute()

/**
 * Examples
 */
const examples: Examples = {
  simple: {
    title: 'Simple',
    values: [
      '5f8d3c21a6b789d43ff928e7b0a94cde7312b7d1ae46c028af651fce0a12133d',
      '60a457979d2572f0a6845d707eeb50a7be32b258157665f355049b3274adfe5b',
      '4cfb150c8a6b225388db344f7f639023a6ac4cceea51af1f5af30d09b5c940d7',
      'a6f8ebd5a7f1403285506a48cf4f6f58bd9ef9a2e17dbd951ced4309867e4c35',
      '662cb2e7b8d1e40cef0482e7ea6dda27a52a5582a846616c87368b9bd6d192ac',
    ],
  },
}

/**
 * Example/URL helper functions
 */
const selectExample = async () => {
  if (example.value === '') {
    return
  }
  for (let i = 0; i < hexVals.value.length; i++) {
    hexVals.value[i] = examples[example.value]!.values[i]
  }
  await values2Data()
}

function shareURL() {
  const routeData = router.resolve({
    name: 'eip-7951',
    query: {
      hash: hexVals.value[0],
      sigr: hexVals.value[1],
      sigs: hexVals.value[2],
      pubx: hexVals.value[3],
      puby: hexVals.value[4],
    },
  })
  window.open(routeData.href, '_blank')
}

/**
 * EVM Initialization
 */

/**
 * Run the precompile
 */
async function run() {
  await runPrecompile(
    data.value,
    Hardfork.Prague,
    Hardfork.Osaka,
    '100',
    execResultPre,
    execResultPost,
  )
}

/**
 * The combined data is taken as the "source of truth" and the
 * individual values are derived from it.
 */
async function data2Values() {
  if (!isValidByteInputForm(data.value)) {
    return false
  }
  dataToValueInput(data, hexVals, bigIntVals, byteLengths)
  await run()
}

/**
 * The data form values changed.
 */
async function onDataInputFormChange() {
  example.value = ''
  await data2Values()
}

/**
 * The individual values are taken as the "source of truth" and the
 * combined data is derived from them.
 */
async function values2Data() {
  for (let i = 0; i < hexVals.value.length; i++) {
    if (!isValidByteInputForm(hexVals.value[i])) {
      return false
    }
  }

  valueToDataInput(hexVals, bigIntVals, lengthsMask, byteLengths)

  data.value = hexVals.value.join('')

  await run()
}

/**
 * The (some) individual values form values changed.
 */
async function onValueInputFormChange() {
  example.value = ''
  await values2Data()
}

/**
 * Initialize the widget either with URL parameters or with a default example.
 */
async function init() {
  if ('b' in route.query && 'e' in route.query && 'm' in route.query) {
    try {
      hexVals.value[0] = route.query['hash']!.toString()
      hexVals.value[1] = route.query['sigr']!.toString()
      hexVals.value[2] = route.query['sigs']!.toString()
      hexVals.value[3] = route.query['pubx']!.toString()
      hexVals.value[4] = route.query['puby']!.toString()
      await values2Data()
    } catch {
      console.log('Invalid parameter call!')
    }
  } else {
    example.value = 'simple'
    await selectExample()
  }
}

await init()
</script>

<template>
  <EIPC :title="eip.title" :eip="eip.num" :shareURL="shareURL">
    <template v-slot:description>
      <b>How does the new curve precompile work?</b> The secp256r1 (also know as P-256) precompile
      streamlines Ethereum's integration with e.g. Android or Apple devices. Learn how to provide
      the message hash, signature components and public key coordinates to the precompile located at
      address <code>0x100</code>. There are valid and invalid example signatures provided. You can
      also use and test signatures from your own usage contexts of course.
    </template>
    <template v-slot:content>
      <div>
        <p class="text-right">
          <PrecompileExamplesC v-model="example" :examples="examples" :change="selectExample" />
        </p>

        <p>
          <PrecompileDataInput v-model="data" rows="6" :formChange="onDataInputFormChange" />
        </p>

        <PrecompileValueInput
          v-for="(title, index) in ['Hash', 'SigR', 'SigS', 'PubX', 'PubY']"
          :key="index"
          v-model="hexVals[index]"
          :title="title"
          :input="onValueInputFormChange"
          :len="byteLengths[index]"
          :bigIntVal="bigIntVals[index]"
        />

        <div class="grid grid-cols-2 gap-1 mt-2.5">
          <PrecompileResultC v-model="execResultPre" title="Pre-Osaka" :left="true" />
          <PrecompileResultC v-model="execResultPost" title="Post-Osaka" :left="false" />
        </div>
        <PoweredByC :poweredBy="poweredBy" />
      </div>
    </template>
  </EIPC>
</template>
