export class DomListener {
  constructor($root) {
    if (!$root) {
      throw new Error(`No $root provided for DomeListener`)
    }
    this.$root = $root
  }
}