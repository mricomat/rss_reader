const RssUtils = {
  getElements: (node: Document, tagName: string) => {
    if (!node || !node.getElementsByTagName(tagName)) {
      return [];
    }

    const elements = node.getElementsByTagName(tagName);

    return Array.prototype.slice.call(elements);
  },

  getChildElements: (node: Document, tagName: string) => {
    if (!node) {
      return [];
    }

    const elements = node.getElementsByTagName(tagName);

    if (!elements) {
      return [];
    }

    return Array.prototype.filter.call(elements, element => element.parentNode.nodeName === node.nodeName);
  },

  getElementTextContentArray: (node: Document, tagName: string) => {
    const nodes = RssUtils.getChildElements(node, tagName);

    if (!nodes || nodes.length === 0) {
      return [];
    }

    return nodes.map(n => n.textContent);
  },

  getElementTextContent: (node: Document, tagName: string) => {
    const array = RssUtils.getElementTextContentArray(node, tagName);

    return array.length === 0 ? undefined : array[0];
  },
};

export default RssUtils;
