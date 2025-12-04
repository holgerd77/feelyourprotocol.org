<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import HexDataInputC from '../ui/HexDataInputC.vue'
import { type Examples } from '../lib/general.js'
import blob1 from '../lib/blobs/blob1.txt?raw'
import EIPC from './EIPC.vue'
import { EIPs } from '@/views/lib/structure.js'
import PoweredByC from './PoweredByC.vue'
import ExamplesC from '../ui/ExamplesC.vue'
import {
  PP_BOX_LAYOUT,
  PP_BOX_TEXT_SMALL,
  PP_BOX_LAYOUT_SINGLE,
  PP_BOX_TABLE_TD,
} from '../lib/layout'
import PPBoxC from '../ui/PPBoxC.vue'
import { trustedSetup } from '@paulmillr/trusted-setups/fast-peerdas.js'
import { KZG as microEthKZG } from 'micro-eth-signer/kzg.js'
import {
  blobsToCellProofs,
  blobsToProofs,
  computeVersionedHash,
  type PrefixedHexString,
} from '@ethereumjs/util'

const kzg = new microEthKZG(trustedSetup)

const data: Ref<string> = ref('')
const commitment: Ref<string> = ref('')
const versionedHash: Ref<string> = ref('')
const blobProof: Ref<string> = ref('')
const cellProofs: Ref<string[]> = ref([''])

const example: Ref<string> = ref('')

const eip = EIPs['eip-7594']

const router = useRouter()

/**
 * Examples
 */
const examples: Examples = {
  blob1: {
    title: 'Blob 1',
    values: [blob1],
  },
}

const poweredBy = ref([
  {
    name: 'Ethers',
    href: 'https://github.com/ethers-io/ethers.js',
  },
  {
    name: 'Noble Curves',
    href: 'https://github.com/paulmillr/noble-curves',
  },
  {
    name: 'EthereumJS',
    href: 'https://github.com/ethereumjs/ethereumjs-monorepo',
  },
])

/**
 * Example/URL helper functions
 */
const selectExample = async () => {
  if (example.value === '') {
    return
  }
  data.value = examples[example.value]!.values[0]
}

function shareURL() {
  const routeData = router.resolve({
    name: 'eip-7594',
  })
  window.open(routeData.href, '_blank')
}

/**
 * The data form values changed.
 */
async function onDataInputFormChange() {
  example.value = ''
  await run()
}

async function run() {
  try {
    commitment.value = kzg.blobToKzgCommitment(data.value)
    const blobCommitmentVersion = 0x01
    versionedHash.value = computeVersionedHash(
      commitment.value as PrefixedHexString,
      blobCommitmentVersion,
    )
    blobProof.value = blobsToProofs(
      kzg,
      [`0x${data.value}`],
      [commitment.value as PrefixedHexString],
    )![0]
    cellProofs.value = blobsToCellProofs(kzg, [`0x${data.value}`])
  } catch (error) {
    console.error(error)
  }
}
/**
 * Initialize the widget either with URL parameters or with a default example.
 */
async function init() {
  example.value = 'blob1'
  await selectExample()
  await run()
}

await init()
</script>

<template>
  <EIPC :title="eip.title" :eip="eip.num" :shareURL="shareURL">
    <template v-slot:description>
      <p>
        <b>How do blob transactions change with PeerDAS?</b>
        Data availability sampling (DAS) - introduced along the Fusaka hardfork - comes with a new
        proof format for blobs, dividing the previous per-blob proofs into several cell proofs per
        blob. The network wrapper gets a new version 1 and the EIP-4844 blob transaction
        serialization format changes when submitting a blob transaction to the network. Libraries
        like
        <a href="https://github.com/ethers-io/ethers.js/issues/5062" target="_blank">Ethers</a>
        or
        <a
          href="https://github.com/ethereumjs/ethereumjs-monorepo/blob/master/packages/tx/examples/blobTx.ts"
          target="_blank"
          >EthereumJS</a
        >
        give some illustration.
        <br />
        <br />
        Below you can check if the values for versioned hashes, commitments and proofs match with
        your local values or values from blob explorers like
        <a href="https://blobscan.org/" target="_blank">Blobscan</a>.
      </p>
    </template>
    <template v-slot:content>
      <div>
        <ExamplesC v-model="example" :examples="examples" :change="selectExample" />
        <HexDataInputC v-model="data" rows="6" :formChange="onDataInputFormChange" />

        <div :class="PP_BOX_LAYOUT_SINGLE">
          <PPBoxC title="EIP-4844 + EIP-7594" :left="true">
            <table :class="PP_BOX_TEXT_SMALL">
              <tr>
                <td :class="PP_BOX_TABLE_TD">Commitment</td>
                <td :class="[PP_BOX_TABLE_TD, 'break-all']">{{ commitment }}</td>
              </tr>
              <tr>
                <td :class="PP_BOX_TABLE_TD">Versioned Hash</td>
                <td :class="[PP_BOX_TABLE_TD, 'break-all']">{{ versionedHash }}</td>
              </tr>
            </table>
          </PPBoxC>
        </div>
        <div :class="PP_BOX_LAYOUT">
          <PPBoxC title="EIP-4844 | 1 Blob Proof" :left="true">
            <p :class="PP_BOX_TEXT_SMALL">
              {{ blobProof }}
            </p>
          </PPBoxC>
          <PPBoxC title="EIP-7594 | 128 Cell Proofs" :left="false">
            <p
              v-for="(value, index) in cellProofs.slice(0, 4)"
              :class="PP_BOX_TEXT_SMALL"
              :key="index"
            >
              {{ value }}
            </p>
            <p v-if="cellProofs.length > 4" :class="PP_BOX_TEXT_SMALL">...</p>
          </PPBoxC>
        </div>
        <PoweredByC :poweredBy="poweredBy" />
      </div>
    </template>
  </EIPC>
</template>
