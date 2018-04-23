import React from 'react';
import { Reports, ReportSchema } from '/imports/api/report/report';
import { Segment } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';

/** Renders the Page for adding a document. */
class AddReport extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add report failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add report succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { report, machineNumber, createdAt } = data;
    Reports.insert({ report, machineNumber, createdAt }, this.insertCallback);
  }


  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <AutoForm ref={(ref) => { this.formRef = ref; }} schema={ReportSchema} onSubmit={this.submit}>
          <Segment>
            <TextField label="Add a timestamped report" name='report'/>
            <SubmitField value='Submit'/>
            <ErrorsField/>
            <HiddenField name='machineNumber' value={this.props.machineNumber}/>
            <HiddenField name='createdAt' value={new Date()}/>
          </Segment>
        </AutoForm>
    );
  }
}

AddReport.propTypes = {
  machineNumber: PropTypes.string.isRequired,
};

export default AddReport;