import React, { Fragment, JSX } from "react";
import { DefaultNodeTypes } from "@payloadcms/richtext-lexical";

import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from "./nodeFormat";

export type NodeTypes = DefaultNodeTypes;

type Props = {
  nodes: NodeTypes[];
  excerpt?: boolean;
};

export function serializeLexical({ nodes, excerpt }: Props): JSX.Element {
  // NOTE: Hacky fix for
  // https://github.com/facebook/lexical/blob/d10c4e6e55261b2fdd7d1845aed46151d0f06a8c/packages/lexical-list/src/LexicalListItemNode.ts#L133
  // which does not return checked: false (only true - i.e. there is no prop for false)
  const serializedChildrenFn = (node: NodeTypes): JSX.Element | null => {
    if (node.children == null) {
      return null;
    } else {
      if (node?.type === "list" && node?.listType === "check") {
        for (const item of node.children) {
          if ("checked" in item) {
            if (!item?.checked) {
              item.checked = false;
            }
          }
        }
      }
      return serializeLexical({ nodes: node.children as NodeTypes[], excerpt });
    }
  };

  if (excerpt) {
    const text = nodes?.reduce(
      (fullString, node) => {
        if (fullString.characters > 400) return fullString;
        if (node.type === "text") {
          return {
            string: `${fullString.string}${node.text}`,
            characters: fullString.characters + node.text.length,
          };
        }
        if (node.type === "paragraph") {
          const serializedChildren =
            "children" in node
              ? serializeLexical({
                  nodes: node.children as NodeTypes[],
                  excerpt,
                }).props.children
              : "";
          if (serializedChildren) {
            return {
              string: `${fullString.string}${serializedChildren}`,
              characters: fullString.characters + serializedChildren.length,
            };
          }
        }
        return fullString;
      },
      { string: "", characters: 0 },
    );
    return <>{text.string}</>;
  }

  return (
    <Fragment>
      {nodes?.map((node, index): JSX.Element | null => {
        if (node == null) {
          return null;
        }

        if (node.type === "text") {
          let text = <React.Fragment key={index}>{node.text}</React.Fragment>;
          if (node.format & IS_BOLD) {
            text = <strong key={index}>{text}</strong>;
          }
          if (node.format & IS_ITALIC) {
            text = <em key={index}>{text}</em>;
          }
          if (node.format & IS_STRIKETHROUGH) {
            text = (
              <span key={index} className="line-through">
                {text}
              </span>
            );
          }
          if (node.format & IS_UNDERLINE) {
            text = (
              <span key={index} className="underline">
                {text}
              </span>
            );
          }
          if (node.format & IS_CODE) {
            text = <code key={index}>{node.text}</code>;
          }
          if (node.format & IS_SUBSCRIPT) {
            text = <sub key={index}>{text}</sub>;
          }
          if (node.format & IS_SUPERSCRIPT) {
            text = <sup key={index}>{text}</sup>;
          }

          return text;
        }

        const serializedChildren =
          "children" in node ? serializedChildrenFn(node) : "";

        // if (node.type === 'block') {
        //   const block = node.fields

        //   const blockType = block?.blockType

        //   if (!block || !blockType) {
        //     return null
        //   }

        //   switch (blockType) {
        //     case 'cta':
        //       return <CallToActionBlock key={index} {...block} />
        //     case 'mediaBlock':
        //       return (
        //         <MediaBlock
        //           imgClassName="m-0"
        //           key={index}
        //           {...block}
        //           enableGutter={false}
        //           disableInnerContainer={true}
        //         />
        //       )
        //     case 'banner':
        //       return <BannerBlock className="mb-4" key={index} {...block} />
        //     case 'embeddedVideoBlock':
        //       return <EmbeddedVideoBlock key={index} {...block} />
        //     case 'sa':
        //       return <SimpleActionBlock key={index} {...block} />
        //     default:
        //       return null
        //   }
        // } else {
        switch (node.type) {
          case "linebreak": {
            return <br key={index} />;
          }
          case "paragraph": {
            return <p key={index}>{serializedChildren}</p>;
          }
          case "heading": {
            const Tag = node?.tag;
            return <Tag key={index}>{serializedChildren}</Tag>;
          }
          case "list": {
            const Tag = node?.tag;
            return (
              <Tag className="list" key={index}>
                {serializedChildren}
              </Tag>
            );
          }
          case "listitem": {
            if (node?.checked != null) {
              return (
                <li
                  aria-checked={node.checked ? "true" : "false"}
                  className={` ${node.checked ? "" : ""}`}
                  key={index}
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                  role="checkbox"
                  tabIndex={-1}
                  value={node?.value}
                >
                  {serializedChildren}
                </li>
              );
            } else {
              return (
                <li key={index} value={node?.value}>
                  {serializedChildren}
                </li>
              );
            }
          }
          case "quote": {
            return <blockquote key={index}>{serializedChildren}</blockquote>;
          }
          case "link": {
            console.log(node);

            return null;
          }

          default:
            return null;
        }
        // }
      })}
    </Fragment>
  );
}
