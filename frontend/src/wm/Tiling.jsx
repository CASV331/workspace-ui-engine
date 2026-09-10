
function insertWindow(node, newLeaf) {

    if (node.type === "leaf") {
        return {
            type: "split",
            left: node, // Set the current leaf as left
            right: newLeaf // The new window is set to right
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

export function calculateLayout(node, x, y, width, height, depth = 0) {
    // If there is one leaf, it'll take the whole space
    if (node.type === "leaf") {
        return {
            [node.windowId]: { x, y, width, height }
        }
    }

    // Defines the direction in base the depth
    const isHorizontal = depth % 2 === 0

    // Calculates the space for each child
    const leftSpace = isHorizontal
        ? { x, y, width: width / 2, height } // Divide the width
        : { x, y, width, height: height / 2 } // Divide the height

    // Calculates the space for each right child
    const rightSpace = isHorizontal
        ? { x: x + width / 2, y, width: width / 2, height }
        : { x, y: y + height / 2, width, height: height / 2 }

    return {
        ...calculateLayout(node.left, leftSpace.x, leftSpace.y, leftSpace.width, leftSpace.height, depth + 1),
        ...calculateLayout(node.right, rightSpace.x, rightSpace.y, rightSpace.width, rightSpace.height, depth + 1)
    }
}