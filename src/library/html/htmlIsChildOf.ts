export default function htmlIsChildOf (children: Element, parent: Element): boolean {
  const { parentElement } = children
  return parentElement ? parentElement === parent || htmlIsChildOf(parentElement, parent) : false
}
