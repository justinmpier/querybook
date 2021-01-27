import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';

import { FormField, FormFieldInputSection } from 'ui/Form/FormField';
import { Title } from 'ui/Title/Title';
import { Button, SoftButton, TextButton } from 'ui/Button/Button';
import { InfoButton } from 'ui/Button/InfoButton';
import { IconButton } from 'ui/Button/IconButton';
import './DataDocTemplateVarForm.scss';
import { Link } from 'ui/Link/Link';

export interface IDataDocTemplateVarFormProps {
    onSave: (vars: Record<string, string>) => any;
    templatedVariables: Record<string, string>;
    isEditable: boolean;
}

const templatedVarSchema = Yup.object().shape({
    variables: Yup.array().of(Yup.string().min(1)),
});

export const DataDocTemplateVarForm: React.FunctionComponent<IDataDocTemplateVarFormProps> = ({
    onSave,
    templatedVariables,
    isEditable,
}) => (
    <Formik
        validationSchema={templatedVarSchema}
        initialValues={{
            variables: Object.entries(templatedVariables),
        }}
        onSubmit={({ variables }) =>
            onSave(
                variables.reduce((hash, [name, value]) => {
                    hash[name] = value;
                    return hash;
                }, {})
            )
        }
        render={({ handleSubmit, isSubmitting, isValid, values }) => {
            const variablesField = (
                <FieldArray
                    name="variables"
                    render={(arrayHelpers) => {
                        const fields = values.variables.length
                            ? values.variables.map((ignore, index) => (
                                  <div
                                      key={index}
                                      className="horizontal-space-between template-key-value-row"
                                  >
                                      <FormField>
                                          <FormFieldInputSection>
                                              <Field
                                                  name={`variables.${index}[0]`}
                                                  placeholder="Variable's Name"
                                              />
                                          </FormFieldInputSection>
                                          <FormFieldInputSection>
                                              <Field
                                                  name={`variables.${index}[1]`}
                                                  placeholder="Value"
                                              />
                                          </FormFieldInputSection>
                                      </FormField>
                                      <div>
                                          <IconButton
                                              disabled={!isEditable}
                                              icon="x"
                                              onClick={() =>
                                                  arrayHelpers.remove(index)
                                              }
                                          />
                                      </div>
                                  </div>
                              ))
                            : null;
                        const controlDOM = isEditable && (
                            <div className="horizontal-space-between">
                                <TextButton
                                    title="+ Add New Variable"
                                    onClick={() => arrayHelpers.push(['', ''])}
                                />
                                <SoftButton
                                    onClick={() => handleSubmit()}
                                    title="Save"
                                    disabled={isSubmitting || !isValid}
                                />
                            </div>
                        );

                        return (
                            <div className="DataDocTemplateVarForm-content">
                                <fieldset
                                    disabled={!isEditable}
                                    className="mb8"
                                >
                                    {fields}
                                </fieldset>
                                {controlDOM}
                            </div>
                        );
                    }}
                />
            );

            return (
                <div className="DataDocTemplateVarForm">
                    <Form>
                        <div className="horizontal-space-between">
                            <div>
                                <Title>Variables</Title>
                            </div>
                            <div>
                                <InfoButton layout={['bottom', 'right']}>
                                    <div>
                                        <p>
                                            {'Include {{variable_name}} in your query and it will get substituted with ' +
                                                'its value.'}
                                            <br/>
                                            <br/>
                                            <span>
                                                Some variables are provided automatically.
                                            </span>
                                            <br/>
                                            <br/>
                                            <span>
                                                Such as:
                                            </span>
                                            <ul>
                                                <li>
                                                    {
                                                        '* {{today}} which maps to todays date in yyyy-mm-dd format. '
                                                    }
                                                </li>
                                                <li>
                                                    {
                                                        "* {{yesterday}} which maps to yesterday's date."
                                                    }
                                                </li>
                                            </ul>
                                        </p>
                                        <br/>
                                        <p>
                                            {
                                                'You can also include variables in variables for recursive rendering.'
                                            }
                                        </p>
                                        <br/>
                                        <p>
                                            <Link
                                                to={
                                                    'https://jinja.palletsprojects.com/en/2.11.x/templates/'
                                                }
                                            >
                                                See the complete guide here.
                                            </Link>
                                        </p>
                                    </div>
                                </InfoButton>
                            </div>
                        </div>
                        {variablesField}
                    </Form>
                </div>
            );
        }}
    />
);
