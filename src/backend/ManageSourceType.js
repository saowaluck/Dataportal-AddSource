import React from 'react'
import { Grid, Button } from 'semantic-ui-react'

const ManageSourceType = () => (
  <div className='ui main container'>
    <div className='ui centered grid'>
      <div className='twelve wide column'>
        <div className='ui segment'>
          <Grid>
            <Grid.Column floated='left' width={5}>
              <h2>Resource Type</h2>
            </Grid.Column>
            <Grid.Column floated='right' width={5}>
              <button className='ui right floated primary active button' role='presentation' onClick={this.handleAddTable} >
                Add Type 
              </button>
            </Grid.Column>
          </Grid>
          <hr />
          <form className='ui form'>
            <table className='ui very basic collapsing padded table'>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Resource Type</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Database</td>
                  <td>Feb 25,2018</td>
                  <td>
                    <Button.Group size='tiny'>
                      <div className='ui primary icon button' role='presentation' >
                        <i className='edit icon' />
                      </div>
                      <div className='ui red icon button' role='presentation' >
                        <i className='trash icon' />
                      </div>
                    </Button.Group>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Superset Dashboard</td>
                  <td>Apr 26,2017</td>
                  <td>
                    <Button.Group size='tiny'>
                      <div className='ui primary icon button' role='presentation' >
                        <i className='edit icon' />
                      </div>
                      <div className='ui red icon button' role='presentation' >
                        <i className='trash icon' />
                      </div>
                    </Button.Group>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Knowledge Post</td>
                  <td>Apr 26,2017</td>
                  <td>
                    <Button.Group size='tiny'>
                      <div className='ui primary icon button' role='presentation' >
                        <i className='edit icon' />
                      </div>
                      <div className='ui red icon button' role='presentation' >
                        <i className='trash icon' />
                      </div>
                    </Button.Group>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className='meta'>
              <p>Showing 1 to 3 of 3 entries</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
)

export default ManageSourceType
