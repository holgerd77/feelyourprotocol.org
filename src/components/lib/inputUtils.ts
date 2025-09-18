import { isHexString } from '@ethereumjs/util'

/**
 * Checks for Byte input form validity
 * (call only after preformat! (so: strip 0x))
 * 
 * - No 0x-prefix
 * - Valid hex values
 * - Even length (two chars per byte)
 * 
 * @param str 
 * @returns true if valid
 */
export const isValidByteInputForm = (str: string) => {
  const validHex = isHexString(`0x${str}`)
  const evenLength = str.length % 2 === 0
  return validHex && evenLength
}

export const preformatByteInputForm = (str: string) => {
  if (str.substring(0, 2) === '0x') {
    str = str.substring(2)
  }
  return str
}
