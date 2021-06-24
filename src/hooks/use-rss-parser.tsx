import { useEffect, useState } from 'react';
import { DOMParser } from 'xmldom';

import useCache from './use-cache';
import { useFetch } from './use-fetch';

import { IRss, IRssLink, IRssEnclosure, IRssItem } from 'src/types/data';
import RssUtils from 'src/utils/rss';
import { buildRequestId } from 'src/utils/text';

const defRssValues: IRss = {
  title: '',
  links: [],
  description: '',
  items: [],
};

export const useRssParser = (
  url: string = '',
  text: string = '',
  persist: boolean = false,
  cacheLife: number = 24 * 60000
): IRss => {
  const { doFetch, data } = useFetch<any>(persist, cacheLife);
  const cache = useCache<IRss>({ persist, cacheLife });

  const [rssData, setRssData] = useState<IRss>(defRssValues);

  useEffect(() => {
    if (url !== '') doFetchText();
    else parseText(text);
  }, [url, text]);

  useEffect(() => {
    if (data && typeof data === 'string') {
      parseText(data);
    }
  }, [data]);

  const doFetchText = async () => {
    const requestId = buildRequestId({ url });

    if (await cache.has(requestId)) {
      const oldRssData = await cache.get(requestId);
      if (oldRssData) setRssData(oldRssData);
    } else {
      doFetch('get', url, {});
    }
  };

  const parseText = async (newText: string) =>
    new Promise<void>((resolve, reject) => {
      const document = new DOMParser({
        errorHandler: (_level, msg) => {
          reject(msg);
        },
      }).parseFromString(newText, 'text/xml');

      const newRssData: IRss = { ...mapChannelFields(document), items: [...mapItems(document)] };
      setCache(buildRequestId({ url }), newRssData);

      setRssData(newRssData);
      resolve();
    });

  const setCache = async (requestId: string, newRssData: IRss) => {
    await cache.set(requestId, newRssData);
  };

  const getChannelTitle = (node): string => RssUtils.getElementTextContent(node, 'title');

  const getChannelLinks = (node): IRssLink[] => {
    const links = RssUtils.getChildElements(node, 'link');

    return links.map(link => ({
      url: link.textContent,
      rel: link.getAttribute('rel'),
    }));
  };

  const getChannelDescription = (node): string => RssUtils.getElementTextContent(node, 'description');

  const getItemTitle = (node): string => RssUtils.getElementTextContent(node, 'title');

  const getItemLinks = (node): IRssLink[] => {
    const links = RssUtils.getChildElements(node, 'link');

    return links.map(link => ({
      url: link.textContent,
      rel: link.getAttribute('rel'),
    }));
  };

  const getItemDescription = (node): string => RssUtils.getElementTextContent(node, 'description');

  const getItemId = (node): string => RssUtils.getElementTextContent(node, 'guid');

  const getItemEnclosures = (node): IRssEnclosure[] => {
    const enclosures = RssUtils.getChildElements(node, 'enclosure');

    return enclosures.map(enclosure => ({
      url: enclosure.getAttribute('url'),
      length: enclosure.getAttribute('length'),
      mimeType: enclosure.getAttribute('type'),
    }));
  };

  const mapChannelFields = document => {
    if (document) {
      const channelNodes = RssUtils.getElements(document, 'channel');

      if (!channelNodes || channelNodes.length === 0) {
        throw new Error('Could not find channel node');
      }

      const channelNode = channelNodes[0];

      return {
        title: getChannelTitle(channelNode),
        links: getChannelLinks(channelNode),
        description: getChannelDescription(channelNode),
      };
    }
    return {};
  };

  const mapItems = (document): IRssItem[] => {
    if (document) {
      const itemNodes = RssUtils.getElements(document, 'item');

      return itemNodes.map(item => ({
        title: getItemTitle(item),
        links: getItemLinks(item),
        description: getItemDescription(item),
        id: getItemId(item),
        enclosures: getItemEnclosures(item),
      }));
    }
    return [];
  };

  return {
    ...rssData,
  };
};
