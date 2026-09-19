
function insertWindow(node, newLeaf) {

    if (node.type === "leaf") {
        return {
            type: "split",
            left: node,
            right: newLeaf
        }
    }

    return {
        ...node,
        right: insertWindow(node.right, newLeaf)
    }
}
export function buildTree(windows) {
    // Without windows we dont create the tree
    if (windows.length === 0) return null

    let tree = { type: "leaf", windowId: windows[0].id }

    for (let i = 1; i < windows.length; i++) {
        const newLeaf = { type: "leaf", windowId: windows[i].id }
        tree = insertWindow(tree, newLeaf)
    }

    return tree

}

export function calculateLayout(node, x, y, width, height, depth = 0, gap = 0) {
    // If there is one leaf, it'll take the whole space
    if (node.type === "leaf") {
        return {
            [node.windowId]: { x, y, width, height }
        }
    }

    // Defines the direction in base the depth
    const isHorizontal = depth % 2 === 0
    const halfWidth = isHorizontal ? (width - gap) / 2 : width
    const halfHeight = isHorizontal ? height : (height - gap) / 2

    // Calculates the space for each child
    const leftSpace = { x, y, width: halfWidth, height: halfHeight } // Divide the height

    // Calculates the space for each right child
    const rightSpace = isHorizontal
        ? { x: x + halfWidth + gap, y, width: halfWidth, height: halfHeight }
        : { x, y: y + halfHeight + gap, width: halfWidth, height: halfHeight }

    return {
        ...calculateLayout(node.left, leftSpace.x, leftSpace.y, leftSpace.width, leftSpace.height, depth + 1, gap),
        ...calculateLayout(node.right, rightSpace.x, rightSpace.y, rightSpace.width, rightSpace.height, depth + 1, gap)
    }
}