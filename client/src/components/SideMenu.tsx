import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu } from 'antd';

interface IMenuItem {
  text: string;
  route?: string;
  icon?: string;
  children?: IMenuItem[]
}

interface IMenuProp {
  data: IMenuItem[];
}

const { SubMenu } = Menu;

const SideMenu: FC<IMenuProp> = (prop: IMenuProp) => {
  const { data } = prop || {};
  const history = useHistory();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const onItemClicked = (e: any) => {
    const { key } = e || {};
    setSelectedKeys([key]);
    history && history.push(key);
  };

  const renderMenu = (data: IMenuItem[]) => {
    return (data || []).map((item: IMenuItem, itemIndex: number) => {
      const { text, route, icon, children } = item || {};
      const Icon = icon && (
        <i className={icon} />
      );
      if (children && children.length > 0) {
        return (
          <SubMenu
            key={`sub-menu-${itemIndex}`}
            icon={Icon}
            title={text}
          >
            {renderMenu(children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item
          key={route || `menu-${itemIndex}`}
          icon={Icon}
        >
          {text}
        </Menu.Item>
      );
    })
  };

  return (
    <div className="app-menu">
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        onClick={onItemClicked}
      >
        {renderMenu(data)}
      </Menu>
    </div>
  );
}

export default SideMenu;