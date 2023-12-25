### usage
```
import React, { useState } from "react";
import { Input, Select, DatePicker,Slider } from "apusic-ui";
import {AdvancedSearch,FormItemType} from "./index";
import CommonLayout from "../../components/CommonLayout";

const Example = () => {
    const handleSearch = (value:object) => {
        console.log(value);
    };

    const onValuesChange = (value:object) => {
        console.log(value)
    };

     let formItems = [
        {
            formItemProps:{
                name:"clusterName" ,
                label:"集群名称",
            } ,
            type:FormItemType.INPUT,
            placeholder:'请输入集群名称'
        },
         {
             formItemProps:{
                 name:"deploy" ,
                 label:"部署模式",
                 // tooltip:'这是系统的部署模式'
             } ,
             type:FormItemType.SELECT,
             placeholder:'请选择部署模式',
             selectOption: [{
                 label:'单机',
                 value:'aaa'
             },
                 {
                     label:'集群',
                     value:'aaa2'
                 },
                 {
                     label:'主从',
                     value:'aaa1'
                 }]
         },
         {
             formItemProps:{
                 name:"time" ,
                 label:"时间范围"
             } ,
             type:FormItemType.DATEPICKER,
         },
         {
            formItemProps:{
                name:"fileName" ,
                label:"文件名称",

            } ,
             placeholder:'请输入文件名称',
            type:FormItemType.INPUT,
        },
    ]

    return (
        <CommonLayout>
            <div style={{background:'#fff',padding:'20px 0 4px 0',margin:'20px 20px 0 20px'}}>
            <AdvancedSearch
                items={formItems}
                onChange={handleSearch}
                labelCol={{flex:'60px'}}
                onValuesChange={onValuesChange}
                collapsible
            />
            </div>
            <div style={{background:'#fff',padding:'20px 0 4px 0',margin:'20px'}}>
                <AdvancedSearch
                    items={formItems}
                    onChange={handleSearch}
                    labelCol={{flex:'60px'}}
                    onValuesChange={onValuesChange}
                />
            </div>
        </CommonLayout>
    );
};

export default Example;
```

### component
```
import {Button, Col, Form, Input, Row, Select,DatePicker,} from "apusic-ui";
import React, {useEffect, Fragment, useState} from "react";
import { DownOutlined } from '@ant-design/icons';
import './index.css';

const { Option } = Select;
const { RangePicker } = DatePicker;

type OptionalExpect<T,K extends keyof T> = Partial<Omit <T,K>> & Required<Pick <T,K>>
interface AdvancedSearchProps {
    items:any[];
    onChange:Function;
    data:any;
    gutter:number;
    labelCol?:any;
    onValuesChange:Function;
    collapsible:boolean;
    colon:boolean
}
export enum FormItemType {
    SELECT = "SELECT" ,
    INPUT = "INPUT" ,
    DATEPICKER = "DATEPICKER",
    //null的时候表示自定义
}

const formItemRender=(item:any)=>{
    const { style,type,disabled = false,placeholder,FormItemComp } = item;
    switch (type){
        case FormItemType.INPUT:
            return <Input placeholder={placeholder || ""} disabled={disabled} style={{...style}}/>;
        case FormItemType.SELECT:
            return (
                <Select allowClear disabled={disabled} placeholder={placeholder || ""} style={{...style}}>
                    {
                        item.selectOption && item.selectOption.length>0 && item.selectOption.map((option: any)=>{
                            return (<Option key={option.value} value={option.value}>{option.label}</Option>)
                        })
                    }
                </Select>
            )
        case FormItemType.DATEPICKER:{
            return <RangePicker style={{width:'100%'}} disabled={disabled} placeholder={placeholder || ""}/>
        }
        default :{
            return FormItemComp;
        }

    }
}
export const AdvancedSearch = (props: OptionalExpect<AdvancedSearchProps, 'items'>) => {
    const [form] = Form.useForm();
    const { onChange,items,data,gutter,colon=false,onValuesChange,collapsible,labelCol={flex:'60px'} } = props;
    const [screenSize,setScreenSize] = useState<number>( window.innerWidth);
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const collapseStyle = {marginLeft:'4px',verticalAlign: 'inherit',fontSize:'11px'}
    const paddingStyle = {padding:'0 20px'}

    useEffect(()=>{
        window.addEventListener('resize',handleResize)
        return ()=>{
            window.removeEventListener('resize',handleResize)
        }
    },[])

    useEffect(()=>{
        form.setFieldsValue(data);
    },[data])

    function handleResize(){
        setScreenSize(window.innerWidth)
    }
    const getFields = () => {
        const children = [];
        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            let itemClassName="search-item-col-8";
            if(screenSize>1200){
                if(( i % 3 < 2)){
                    itemClassName="search-item-col-7"
                }else itemClassName="search-item-col-8";
            }else if(screenSize>960 && screenSize<=1200){
                if( i % 2 === 0){
                    itemClassName="search-item-col-12";
                }else{
                    itemClassName="search-item-col-11";
                }
            }else if(screenSize<=960){
                itemClassName="search-item-col-24";
            }
            children.push(
                <Fragment key={i}>

                    <Col className={itemClassName}>
                        {
                            (item.formItemProps?.labelCol1920 && screenSize>1200) ?
                                <Form.Item
                                    {...item.formItemProps}
                                    labelCol={item.formItemProps?.labelCol1920}
                                    style={{marginBottom:'16px'}}

                                >
                                    { formItemRender(item) }
                                </Form.Item> :
                                (item.formItemProps?.labelCol1200 && screenSize>960 && screenSize<=1200) ?
                                    <Form.Item
                                        {...item.formItemProps}
                                        labelCol={item.formItemProps?.labelCol1200}
                                        style={{marginBottom:'16px'}}
                                    >
                                        { formItemRender(item) }
                                    </Form.Item> : (item.formItemProps?.labelCol960 && screenSize<=960) ?
                                        <Form.Item
                                            {...item.formItemProps}
                                            labelCol={item.formItemProps?.labelCol960}
                                            style={{marginBottom:'16px'}}
                                        >
                                            { formItemRender(item) }
                                        </Form.Item> :
                                        <Form.Item
                                            {...item.formItemProps}
                                            style={{marginBottom:'16px'}}

                                        >
                                            { formItemRender(item) }
                                        </Form.Item>
                        }

                    </Col>
                    {
                        screenSize > 1200 && (i%3<2) &&
                        <Col className="search-space3-col"/>
                    }
                    {
                        screenSize <= 1200 && screenSize > 960 && i%2===0 &&
                        <Col className="search-space2-col"/>
                    }
                </Fragment>,
            );
        }
        return children;
    };
    const renderFilters = (filters: any[]) => {
        if (!collapsed || items.length === 1) {
            return filters;
        }
        if(screenSize>1200){
            return filters.slice(0, 2);
        }else if (screenSize <= 1200){
            return filters.slice(0, 1);
        }

    };
    const onFinish = (valu·es: any) => {
        if(onChange){
            onChange(values)
        }
    };
    const buttonCol = ()=>{
        let itemClassName="search-item-col-8";
        if(collapsible && collapsed && screenSize>1200 && items.length!==1){
            return "search-item-col-8"
        }else if(collapsible && collapsed && screenSize>1200 && items.length===1){
            return "search-item-col-17"
        }else if(collapsible && collapsed && screenSize>960 && screenSize<=1200){
            return "search-item-col-11"
        }else if(collapsible && collapsed && screenSize<=960){
            return "search-item-col-24"
        }
        if(screenSize>1200){
            itemClassName= items.length%3===0 ? "search-item-col-24": items.length%3===1 ? "search-item-col-17": "search-item-col-8";
        }else if(screenSize>960 && screenSize<=1200){
            itemClassName= items.length%2===0 ? "search-item-col-24":"search-item-col-11";
        }else if(screenSize<=960){
            itemClassName="search-item-col-24";
        }
        return itemClassName
    }

    function handleOnChange(changedValues:any, allValues:any){
        if(onValuesChange){
            onValuesChange(allValues)
        }
    }
    function resetForm() {
        form.resetFields();
        let time:any =undefined;

        onChange && onChange(
            {
                ...form.getFieldsValue(),
                ...time
            }

        )

    }
    return (
        <Form
            form={form}
            colon={colon}
            name="advanced_search"
            className="belle-advanced-search-form"
            onFinish={onFinish}
            style={paddingStyle}
            labelCol={labelCol}
            labelAlign="left"
            onValuesChange={handleOnChange}
        >
            <Row gutter={gutter?gutter:8}>
                { items && items.length>0 && collapsible ? renderFilters(getFields()) : getFields()}
                {
                    <Col className={`${buttonCol()}`} style={{ textAlign: 'right',marginBottom:16 }}>
                        <Button
                            style={{ margin: '0 12px' }}
                            onClick={resetForm}
                        >
                            重置
                        </Button>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                        {collapsible && (
                            <Button onClick={() => setCollapsed(!collapsed)} type="link" style={{ marginLeft: '4px',marginRight:'-12px' }}>
                                {
                                    collapsed ?
                                        <span>展开<DownOutlined style={collapseStyle}/></span>
                                        :
                                        <span>收起<DownOutlined rotate={180} style={collapseStyle}/></span>
                                }
                            </Button>
                        )}
                    </Col>
                }
            </Row>
        </Form>
    );
}
```

### css
```
.search-item-col-24{
    flex: 0 0 100%;
    max-width: 100%;
}
.search-item-col-12{
    flex: 0 0 50%;
    max-width: 50%;
}
.search-item-col-11{
    flex: 0 0 45.8333333333%;
    max-width: 45.8333333333%;
}
@media (min-width: 1201px){
    .search-item-col-8{
        flex: 0 0 33.3333333333%;
        max-width: 33.3333333333%;
    }
    .search-item-col-7{
        flex: 0 0 29.1666666666%;
        max-width: 29.1666666666%;
    }
    .search-space3-col,.search-space2-col{
        flex: 0 0 4.1666666666%;
        max-width: 4.1666666666%;
    }

    .search-button-col{
        flex: 0 0 33.3333333333%;
        max-width: 33.3333333333%;
    }
    .search-item-col-17{
        flex: 0 0 66.6666666666%;
        max-width: 66.6666666666%;
    }
}
@media (max-width:1200px) and (min-width: 961px){
    .search-item-col-12{
        flex: 0 0 50%;
        max-width: 50%;
    }
    .search-item-col-11{
        flex: 0 0 45.8333333333%;
        max-width: 45.8333333333%;
    }

    .search-space2-col,.search-space3-col{
        flex: 0 0 4.1666666666%;
        max-width: 4.1666666666%;
    }
    .search-button-col{
        flex: 0 0 45.8333333333%;
        max-width: 45.8333333333%;
    }
}
@media (max-width: 960px){
    .search-item-col-24{
        flex: 0 0 100%;
        max-width: 100%;
    }

    .search-button-col{
        flex: 0 0 100%;
        max-width: 100%;
    }
}
.belle-advanced-search-form .belle-form-item-label > label::after{
    margin: 0 12px 0 2px;
}
```