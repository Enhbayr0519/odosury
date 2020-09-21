import React, {Component, Fragment} from "react";
import { connect } from 'react-redux';
import config from "../../config";
import moment from "moment";
import * as actions from "../../actions/lesson_actions";
import LessonEdit from "./LessonEdit";


const reducer = ({ main, lesson }) => ({ main, lesson });
import { Card, Button, Avatar, Table, Modal, Form, Input, Select, Popconfirm, Spin, Row, Col, TreeSelect, InputNumber } from 'antd';
const { Meta } = Card;
const { TextArea } = Input;
const { Option } = Select;
const { TreeNode } = TreeSelect;
import { EditOutlined, DeleteFilled, PlusOutlined, UserOutlined, EditFilled, SearchOutlined, CloseCircleFilled, CaretLeftFilled, CloseOutlined } from '@ant-design/icons'

class Lessons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 0,
            pageSize: 50,
            search: '',
            search_user: '',
            selectedMember: {},
            foodRequirementsArray: [],
            requirement: '',
            learn_check_listArray: [],
            learn_check_list: '',
        };
    }
    componentDidMount() {
        this.props.dispatch(actions.getLesson({pageNum: this.state.pageNum, pageSize: this.state.pageSize}));

    }
    openModal(data) {
        const { lesson:{categories, teacherCount} } = this.props;
        if(!categories || categories.length < 1){
            return config.get('emitter').emit('warning', ("Эхлээд ангилал үүсгэнэ үү!"));
        }
        if(teacherCount < 1){
            return config.get('emitter').emit('warning', ("Эхлээд багш үүсгэнэ үү!"));
        }
        // this.setState({ search_user: '', selectedMember: data.teacher, foodRequirementsArray: data.requirements, requirement: '', learn_check_listArray: data.learn_check_list, learn_check_list: '' });
        this.props.dispatch(actions.openLessonModal(data));
    }
    closeModal() {
        this.props.dispatch(actions.closeLessonModal());
    }
    onChangeHandler(e) {
        this.props.dispatch(actions.lessonChangeHandler({name:e.target.name, value: e.target.value}));
    }
    tableOnChange(data){
        const {dispatch } = this.props;
        this.setState({pageNum : data.current - 1});
        let cc = {
            pageNum:data.current - 1,
            pageSize:this.state.pageSize,
            search: this.state.search
        };
        // this.props.dispatch(actions.getTeachers(cc));
    }
    delete(id){
        this.props.dispatch(actions.deleteLesson({_id:id, pageSize: this.state.pageSize, pageNum: this.state.pageNum}));
    }
    searchTeacher(event, value){
        const {dispatch} = this.props;
        function submitSearch(aa){
            dispatch(actions.searchTeacher({search_user:aa}));
            // console.log('dis dis');
        }
        if (event === 'search_member' && value !== '') {
            this.setState({ search_user: value });
            clearTimeout(this.state.timeOut);
            let text = value;
            let timeOut = setTimeout(function(){
                submitSearch(text)
            }, 300);
            this.setState({
                timeOut:timeOut
            });
        }
    }

    chooseMember(item) {
        const {lesson:{searchTeachersResult}} = this.props;
        this.setState({selectedMember: ((searchTeachersResult || []).filter(run => run._id.toString() === item.toString())[0] || {}) });
    };
    onChangeHandle2(name, value) {
        // let val = (value || '').split('-');
        // let result = val[val.length - 1];
        this.props.dispatch(actions.lessonChangeHandler({name:name, value: value}));
    }

    removeSingleOrts(index, name){
        if(name === 'requirement'){
            let hold = [];
            if(this.state.foodRequirementsArray && this.state.foodRequirementsArray.length>0){
                hold = this.state.foodRequirementsArray.filter((run, idx) => idx !== index);
                this.setState({foodRequirementsArray: hold})
            }
        }
        if(name === 'learn_check_list'){
            let hold = [];
            if(this.state.learn_check_listArray && this.state.learn_check_listArray.length>0){
                hold = this.state.learn_check_listArray.filter((run, idx) => idx !== index);
                this.setState({learn_check_listArray: hold})
            }
        }
    }
    addSingleOrts(name){
        if(name === 'requirement'){
            const {requirement} = this.state;
            let s = requirement.trim();
            if(s && s !== ''){
                let hold = this.state.foodRequirementsArray;
                hold.unshift(s);
                this.setState({foodRequirementsArray: hold, requirement:''});
            }
        }
        if(name === 'learn_check_list'){
            const {learn_check_list} = this.state;
            let s = learn_check_list.trim();
            if(s && s !== ''){
                let hold = this.state.learn_check_listArray;
                hold.unshift(s);
                this.setState({learn_check_listArray: hold, learn_check_list:''});
            }
        }
    }

    changeState(e, value){
        if (typeof e === 'string' || e instanceof String) {
            this.setState({ [e]: value});
        } else {
            this.setState({ [e.target.name]: e.target.value});
        }
    }
    render() {
        let { main:{user}, lesson:{status, openModal, lesson, lessons, submitLessonLoader, all, searchTeachersResult, searchTeacherLoader, categories} } = this.props;
        let pagination = {
            total : all,
            current: this.state.pageNum + 1,
            pageSize : this.state.pageSize,
            position: 'bottom',
            showSizeChanger: false
        };
        const columns = [
            {
                key: 'num',
                title: '№',
                render: (text, record, idx) => (
                    (this.state.pageNum * this.state.pageNum) + idx + 1
                ),
            },
            {
                key: 'name',
                title: 'Нэр',
                render: (text, record) => (
                    record.title ? record.title : '-'
                ),
            },
            {
                key: 'created',
                title: 'Огноо',
                render: (text, record) => (
                    record.created ? moment(record.created).format('YYYY-MM-DD') : '-'
                ),
            },
            {
                title: 'Үйлдэл',
                key: 'action',
                render: (text, record) => (
                    <div style={{width: 240}}>

                        <Button size={"small"} style={{marginRight: 10}} key={record._id+'edit'} loading={!!record.loading}
                                onClick = {this.openModal.bind(this, record )}
                        >
                            <EditFilled /> Засах
                        </Button>
                        <Popconfirm
                            title={`Та устгах гэж байна!`}
                            onConfirm={this.delete.bind(this, record._id)}
                            okText="Усгах"
                            placement="left"
                            cancelText="Болих"
                        >
                            <Button type={"primary"} key={record._id} danger size={"small"} loading={!!record.loading}>
                                <DeleteFilled/> Устгах
                            </Button>
                        </Popconfirm>
                    </div>
                ),
                width: 240
            },
        ];
        let avatar = '/images/default-avatar.png';
        if (this.state.selectedMember && this.state.selectedMember.avatar && this.state.selectedMember.avatar !== '') {
            avatar = this.state.selectedMember.avatar.indexOf('http') > -1 ? this.state.selectedMember.avatar : `https://amjilt.com${ this.state.selectedMember.avatar}`;
        }
        return (
            <Card
                title="Хичээл"
                bordered={true}
                loading={status}
                extra={
                    openModal?
                        <Button type="default" key='backButton' icon={<CloseOutlined />} onClick={this.closeModal.bind(this)} >
                            Болих
                        </Button>
                        :
                        <Button type="primary" key='forwardButton' icon={<PlusOutlined />} onClick={this.openModal.bind(this, {})} >
                            Хичээл
                        </Button>
                }
            >
                {openModal?
                    <LessonEdit />
                    :
                    <React.Fragment>
                        {/*<div style={{marginBottom: 20}}>*/}
                        {/*    <Input maxLength={60} size='small' placeholder='Нэр, имэйл' style={{width: 200, marginRight: 20}} value={this.state.search} name='search' onChange={(e) => this.setState({search: e.target.value})} />*/}
                        {/*    <Button type="primary" size='small' icon={<SearchOutlined />} onClick={this.searchTeacher.bind(this)} >Хайх</Button>*/}
                        {/*</div>*/}
                        <Table size="small" dataSource={lessons} columns={columns} onChange={this.tableOnChange.bind(this)} pagination={pagination} />
                    </React.Fragment>
                }
            </Card>
        );
    }
}

export default  connect(reducer)(Lessons);