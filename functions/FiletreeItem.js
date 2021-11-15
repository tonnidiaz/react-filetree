import React,{ useEffect, useState } from "react";
import styles from "../styles/Filetree.module.css";
import $ from "jquery";
import ReactDOM from 'react-dom'
import {
  AiOutlineEllipsis,
  AiFillFile,
  AiFillFolderOpen,
} from "react-icons/ai";
import { BsFillFolderFill } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";

const FiletreeItem = (id, fil) => {
  let nodes = document.querySelectorAll("." + styles.node);
  let nodesClone = [];
  for (let i = 0; i < nodes.length; i++) {
    nodesClone.push(nodes[i]);
  }

  let li = document.createElement("li");
  let ul = document.createElement("ul");
  let html = "";
  if (fil.children) {
    html += `<div class="${styles.folder}">
                                <div data-id=${fil.id} class="${styles.mainNodeChild}">
                                <span class="${styles.icon} ${styles.folderIcon}" id=${fil.id}  data-type="folder"></span>&nbsp;
                                <span class="${styles.foldername}" data-parent="${id}">${fil.name}</span>
                                </div>
                                <span class="${styles.iconContainer} ${styles.fileOpts}">
                                <span class="${styles.icon} ${styles.optIcon}"></span>
                                
                            </span>
                            </div>`;
    li.innerHTML = html;

    $(ul).addClass(styles.closed);
    $(ul).addClass(styles.node);

    ul.dataset.id = fil.id;
    li.appendChild(ul);
  } else {
    html += `
    <div class="${styles.file}">
    <div data-id=${fil.id} class="${styles.mainNodeChild}">
          <span id="${fil.id}" 
          style="display: flex;
          align-items: center;"
      class="${styles.icon}" data-type="file">
      </span>&nbsp;
                  <span class="${styles.filename}" data-parent="${id}" title="${fil.name}">${fil.name}</span>
                  </div>
                  <span class="${styles.iconContainer} ${styles.fileOpts}">
                          <span class="${styles.icon} ${styles.optIcon}"></span>
                      </span>
                    </div>`;

    li.innerHTML = html;
  }
  li.dataset.parent = id;
  nodesClone.forEach((node) => {
    node.dataset.id === id && node.appendChild(li);
  });
  let iconNode = document.getElementById(`${fil.id}`);
  iconNode && iconNode.dataset.type === 'file' ? ReactDOM.render(<AiFillFile/>, iconNode) : ReactDOM.render(<BsFillFolderFill/>, iconNode)
  //$(li).find('.' + styles.mainNodeChild).click()
  return $(li).find("." + styles.mainNodeChild);
};

export default FiletreeItem;
