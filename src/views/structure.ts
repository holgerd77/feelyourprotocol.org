export const EIPs: EIPs = {
  'eip-7883': {
    num: 7883,
    path: '/eip-7883-modexp-gas-cost-increase',
    hardforkId: 'fusaka',
    topicId: 'precompiles',
  },
}

// Attention! The title is used for routing!
export const HARDFORKS: Hardforks = {
  fusaka: {
    title: 'Fusaka',
    path: '/fusaka',
    url: 'https://forkcast.org/upgrade/fusaka',
    eips: getHardforkEIPs('fusaka'),
  },
}

// Attention! The title is used for routing!
export const TOPICS: Topics = {
  precompiles: {
    title: 'Precompiles',
    path: '/precompiles',
    eips: getTopicEIPs('precompiles'),
  },
}

export interface EIP {
  num: number
  path: string
  hardforkId: string
  topicId: string
}
export interface EIPs {
  [key: string]: EIP
}

export interface Hardfork {
  title: string
  path: string
  url: string
  eips: number[]
}
export interface Hardforks {
  [key: string]: Hardfork
}

export interface Topic {
  title: string
  path: string
  eips: number[]
}
export interface Topics {
  [key: string]: Topic
}

function getHardforkEIPs(hardforkId: string) {
  const eips: number[] = []
  for (const [, eip] of Object.entries(EIPs)) {
    if (eip.hardforkId === hardforkId) {
      eips.push(eip.num)
    }
  }
  return eips
}

function getTopicEIPs(topicId: string) {
  const eips: number[] = []
  for (const [, eip] of Object.entries(EIPs)) {
    if (eip.topicId === topicId) {
      eips.push(eip.num)
    }
  }
  return eips
}
