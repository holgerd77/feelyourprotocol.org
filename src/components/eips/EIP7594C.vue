<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import EIPC from './EIPC.vue'
import { EIPs } from '@/views/lib/structure.js'
import PoweredByC from './PoweredByC.vue'

const eip = EIPs['eip-7594']
const router = useRouter()
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

function shareURL() {
  const routeData = router.resolve({
    name: 'eip-7594',
  })
  window.open(routeData.href, '_blank')
}
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
        <PoweredByC :poweredBy="poweredBy" />
      </div>
    </template>
  </EIPC>
</template>
