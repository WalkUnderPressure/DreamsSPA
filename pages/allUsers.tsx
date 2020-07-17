import React, { Component } from 'react'
import Layout from '../Layout'
import Table from '../components/Table'
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import { getAllUsers } from 'redux/entities/UserEntity';
import { ENTITIES } from '../COMMON';

interface IAllUsersProps {
    tableItems: List<Map<string, any>>;
}
interface IAllUsersState {
    tableItems: List<Map<string, any>>;
}

class AllUsers extends Component<IAllUsersProps, IAllUsersState> {
    constructor(props: IAllUsersProps) {
        super(props)
        this.state = {
            tableItems: List(),
        }
    }

    static async getInitialProps(ctx) {
        console.log('getInitialProps call!', ctx);
        ctx.store.execSagaTasks(ctx, (dispatch: any) => {
            ctx.store.dispatch(getAllUsers());
        })
    }

    render() {
        console.log('all users items : ', this.props.tableItems);
        const element = this.props;
        const tableFields: string[] = [
            'First Name',
            'Last Name',
            'Role',
            'Email',
            'ACTION'
        ]
        return (
            <Layout>
                <div className='w-full p-4'>
                    <Table tableName='Users' tableFields={tableFields} className='w-full p-5 bg-ocean-900 ' data={element.tableItems} />
                </div>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => {
    const allUsers: List<any> = state.entities.get(ENTITIES.USERS);
    console.log('All Users - ', allUsers);

    return ({
        tableItems: allUsers,
    })
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
