import React, { useState } from 'react';
import './App.css';
import {
  Button,
  Container,
  Dropdown,
  Checkbox,
  Header,
  Segment,
  Table,
} from 'semantic-ui-react';
function App() {
  const deviceOptions = [
    {
      dataValue: '1000',
      value: '1',
      text: 'Laptop',
      iskey: 'true',
      mandatory: 'true',
      recommended: 'false',
    },
    {
      dataValue: '1000',
      value: '2',
      text: 'Mobile',
      iskey: 'true',
      mandatory: 'true',
      recommended: 'false',
    },
    {
      dataValue: '1000',
      value: '3',
      text: 'Tv',
      iskey: 'true',
      mandatory: 'true',
      recommended: 'false',
    },
    {
      dataValue: '1000',
      value: '4',
      text: 'Earphone',
      iskey: 'true',
      mandatory: 'true',
      recommended: 'false',
    },
    {
      dataValue: '1000',
      value: '5',
      text: 'Speaker',
      iskey: 'true',
      mandatory: 'true',
      recommended: 'false',
    },
  ];

  const [contextList, setcontextList] = useState([]);
  const [deviceOptionsList, setdeviceOptionsList] = useState(deviceOptions);

  const updateList = (e, data) => {
    let filteredData = data.options.filter(
      (dataRow) => dataRow.value === data.value
    );
    let avilableData = data.options.filter(
      (dataRow) => dataRow.value !== data.value
    );
    contextList.push(filteredData[0]);
    setdeviceOptionsList([...avilableData]);
    setcontextList([...contextList]);
  };

  const updateContextRow = (e, data, contextRowVal, selectType) => {
    let avilableData = contextList.filter(
      (dataRow) => dataRow.value !== contextRowVal.value
    );
    if (selectType === 'recommended') {
      if (data.value === 'false') {
        contextRowVal.iskey = 'false';
        contextRowVal.mandatory = 'false';
        contextRowVal.recommended = 'true';
      } else {
        contextRowVal.recommended = 'false';
      }
      for (var i = 0; i < contextList.length; i++) {
        if (contextList[i].value === contextRowVal.value) {
          contextList.splice(i, 1, contextRowVal);
          break;
        }
      }

      setcontextList([...contextList]);
    } else if (selectType === 'iskey') {
      if (data.value === 'false') {
        contextRowVal.iskey = 'true';
      } else {
        contextRowVal.iskey = 'false';
      }
      for (var i = 0; i < contextList.length; i++) {
        if (contextList[i].value === contextRowVal.value) {
          contextList.splice(i, 1, contextRowVal);
          break;
        }
      }

      setcontextList([...contextList]);
      console.log(data.value);
    } else if (selectType === 'mandatory') {
      if (data.value === 'false') {
        contextRowVal.mandatory = 'true';
      } else {
        contextRowVal.mandatory = 'false';
      }
      for (var i = 0; i < contextList.length; i++) {
        if (contextList[i].value === contextRowVal.value) {
          contextList.splice(i, 1, contextRowVal);
          break;
        }
      }

      setcontextList([...contextList]);
      console.log(data.value);
    } else {
      debugger;
      for (var i = 0; i < contextList.length; i++) {
        if (contextList[i].value === contextRowVal.value) {
          deviceOptionsList.push(contextRowVal);
          // contextList.splice(i, 1, contextRowVal);
          break;
        }
      }
      let sortDeviceOptionsList = deviceOptionsList.sort((a, b) =>
        a.value > b.value ? 1 : -1
      );
      setcontextList([...avilableData]);
      setdeviceOptionsList([...sortDeviceOptionsList]);
    }
  };

  return (
    <>
      {' '}
      <div className="App">
        <Container>
          <Segment.Group>
            <Segment>
              {' '}
              <Header> Altron Demo [Pick the Context/Item Name]</Header>
            </Segment>
            <Segment>
              {' '}
              <Dropdown
                placeholder="Select Item Name"
                fluid
                search
                selection
                options={deviceOptionsList}
                onChange={updateList}
              />
            </Segment>
          </Segment.Group>
          <Segment.Group>
            <Segment>
              <Table celled compact definition>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan="6">
                      <Header>Context</Header>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Header fullWidth>
                  <Table.Row>
                    <Table.HeaderCell>Context</Table.HeaderCell>
                    <Table.HeaderCell>Value</Table.HeaderCell>
                    <Table.HeaderCell>isKey</Table.HeaderCell>
                    <Table.HeaderCell>Mandatory</Table.HeaderCell>
                    <Table.HeaderCell>Recommended</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {contextList.map((contextListVal) => (
                    <Table.Row key={contextListVal.text}>
                      <Table.Cell>{contextListVal.text}</Table.Cell>
                      <Table.Cell>{contextListVal.dataValue}</Table.Cell>
                      <Table.Cell>
                        <Checkbox
                          slider
                          checked={contextListVal.iskey === 'true'}
                          onChange={(e, data) =>
                            updateContextRow(e, data, contextListVal, 'iskey')
                          }
                          value={contextListVal.iskey}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Checkbox
                          slider
                          checked={contextListVal.mandatory === 'true'}
                          onChange={(e, data) =>
                            updateContextRow(
                              e,
                              data,
                              contextListVal,
                              'mandatory'
                            )
                          }
                          value={contextListVal.mandatory}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Checkbox
                          slider
                          checked={contextListVal.recommended === 'true'}
                          onChange={(e, data) =>
                            updateContextRow(
                              e,
                              data,
                              contextListVal,
                              'recommended'
                            )
                          }
                          value={contextListVal.recommended}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          negative
                          onClick={(e, data) => {
                            debugger;
                            updateContextRow(
                              e,
                              data,
                              contextListVal,
                              'deleteRow'
                            );
                          }}
                        >
                          Delete
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>

                <Table.Footer fullWidth>
                  <Table.Row>
                    <Table.HeaderCell colSpan="6">
                      {/* <Button
                        floated="right"
                        icon
                        labelPosition="left"
                        primary
                        size="small"
                      >
                        <Icon name="user" /> Add User
                      </Button>
                      <Button size="small">Approve</Button> */}
                      <Button.Group floated="right" size="small">
                        <Button positive>Save</Button>
                        <Button.Or />
                        <Button>Edit</Button>
                        <Button.Or />
                        <Button negative>Cancel</Button>
                      </Button.Group>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            </Segment>
          </Segment.Group>
        </Container>
      </div>{' '}
    </>
  );
}

export default App;
