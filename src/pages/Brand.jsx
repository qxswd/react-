import React, { Component } from 'react'

export default class Brand extends Component {
    constructor(){
        super()
        this.state = {
            BrandList :[
                {
                    id:2,
                    name:"路虎",
                    time:new Date()
                },
                {
                    id:1,
                    name:"奥迪",
                    time:new Date()
                }
            ],
            middleware:[]
        }
    }
    submit(e){
        if(e.keyCode === 13){
            let name = e.target.value;
            if(name === ""){
                alert('请输入品牌名称');
                return
            }
            if(this.state.middleware.id){
                this.update(this.state.middleware,name)
            }else{
                this.add(name)
            }
            // 将输入框中value值清空
            e.target.value = '';
            }
        }
    

    //添加商品
    add(name){
        const {BrandList} = this.state
        let id = BrandList.length > 0 ? BrandList[0].id + 1 : 1;
        let time = new Date();
        let params = {
            id,
            name,
            time
        }
        BrandList.unshift(params)
        this.setState({BrandList})
    }
    edit(row){
        //先将内容显示到输入框
        document.querySelector("input").value = row.name
        // 将内容存入搭配middleware中
        this.setState({middleware:row})
    }

    update(row,name){
        const {BrandList} = this.state
        const newList = BrandList.map(item=>{
            if(item.id == row.id){
                return{
                    ...item,
                    name:name
                }
            }else{
                return item
            }
        })
        this.setState({BrandList:newList})
        // 清空middleware的值
        this.setState({middleware:{}})
    }
    del(item){
        this.state.BrandList.splice(item,1);
        this.setState({BrandList:this.state.BrandList})
    }
    


    render() {
        const {BrandList} = this.state
        const style = {textAlign:"center"}
        return (
            <div className="container">
            <h1 style={style}>品牌管理</h1>
            <div className="well">
                <input className="form-control" type="text" placeholder="请输入品牌名称" onKeyUp={(e)=>this.submit(e)}/>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>品牌名称</th>
                        <th>创建时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                        {BrandList.map(item=>(
                             <tr key={item.id}>
                             <td>{item.id}</td>
                             <td>{item.name}</td>
                             <td>{item.time.toLocaleString()}</td>
                             <td>
                                 <button className="btn btn-primary" onClick={()=>this.edit(item)}>编辑</button>
                                 <button className="btn btn-danger" onClick={()=>this.del(item)}>删除</button>
                             </td>
                         </tr>
                        ))}
                       
                    
                </tbody>
            </table>
            
        </div>
    )
    }
}