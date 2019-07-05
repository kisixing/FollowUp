/* eslint-disable no-plusplus */
/*
 * @Description: 目录树组建
 * @Author: Zhong Jun
 * @Date: 2019-07-04 10:18:14
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tree, Input, Icon } from 'antd';

const { TreeNode } = Tree;
const { Search } = Input;

class MenuTree extends Component {
  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
  };

  getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some(item => item.key === key)) {
          parentKey = node.key;
        } else if (this.getParentKey(key, node.children)) {
          parentKey = this.getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

  generateList = (data, result = []) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      result.push(node);
      if (node.children) {
        this.generateList(node.children, result);
      }
    }
    return result;
  };

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onChange = e => {
    const { value } = e.target;
    const { dataSource } = this.props;
    const dataList = this.generateList(dataSource);

    const expandedKeys = dataList
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          return this.getParentKey(item.key, dataSource);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  };

  onSelect = id => {
    const { onClick, dataSource } = this.props;
    const dataList = this.generateList(dataSource);
    const selectItem = dataList.filter(e => e.key === id)[0];
    onClick(selectItem);
  };

  render() {
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    const { dataSource } = this.props;
    const loop = data =>
      data.map(item => {
        const index = item.title.indexOf(searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ color: '#f50' }}>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.title}</span>
          );
        if (item.children) {
          return (
            <TreeNode key={item.key} title={title} icon={<Icon type={item.icon} />}>
              {loop(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode key={item.key} title={title} icon={<Icon type={item.icon} />} />;
      });

    return (
      <div>
        <Search style={{ marginBottom: 8 }} placeholder="搜索..." onChange={this.onChange} />
        <Tree
          blockNode
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onSelect={selectedKeys => this.onSelect(selectedKeys[0])}
        >
          {loop(dataSource)}
        </Tree>
      </div>
    );
  }
}

MenuTree.propTypes = {
  dataSource: PropTypes.array,
  onClick: PropTypes.func,
};

MenuTree.defaultProps = {
  dataSource: [],
  onClick: () => {},
};

export default MenuTree;
