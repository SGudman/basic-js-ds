const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);

    if (this._root === null) {
      this._root = newNode;
      return;
    }

    let current = this._root;
    while (current !== null) {
      if (data < current.data) {
        if (current.left === null) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else if (data > current.data) {
        if (current.right === null) {
          current.right = newNode;
          return;
        }
        current = current.right;
      } else {
        return;
      }
    }
  }

  find(data) {
    let current = this._root;

    while (current !== null) {
      if (data === current.data) {
        return current;
      }
      current = data < current.data ? current.left : current.right;
    }

    return null;
  }

  has(data) {
    return this.find(data) !== null;
  }

  remove(data) {
    let parent = null;
    let current = this._root;

    while (current !== null && current.data !== data) {
      parent = current;
      current = data < current.data ? current.left : current.right;
    }

    if (current === null) {
      return;
    }

    if (current.left !== null && current.right !== null) {
      let successorParent = current;
      let successor = current.right;

      while (successor.left !== null) {
        successorParent = successor;
        successor = successor.left;
      }

      current.data = successor.data;
      parent = successorParent;
      current = successor;
    }

    const child = current.left !== null ? current.left : current.right;

    if (parent === null) {
      this._root = child;
    } else if (parent.left === current) {
      parent.left = child;
    } else {
      parent.right = child;
    }
  }

  min() {
    let current = this._root;

    if (current === null) {
      return null;
    }

    while (current.left !== null) {
      current = current.left;
    }

    return current.data;
  }

  max() {
    let current = this._root;

    if (current === null) {
      return null;
    }

    while (current.right !== null) {
      current = current.right;
    }

    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};