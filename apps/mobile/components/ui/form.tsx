import {
	Description,
	FieldError,
	Input,
	Label,
	TextField,
	type InputProps,
} from "heroui-native";
import * as React from "react";
import {
	Controller,
	type ControllerProps,
	type FieldPath,
	type FieldValues,
	FormProvider,
	type Noop,
	useFormContext,
} from "react-hook-form";

const Form = FormProvider;

const FormFieldContext = React.createContext<{ name: string } | null>(null);

function FormField<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
}

function useFieldError() {
	const fieldContext = React.useContext(FormFieldContext);
	const { getFieldState, formState } = useFormContext();
	if (!fieldContext) {
		throw new Error("FormInput must be used within <FormField>");
	}
	return getFieldState(fieldContext.name, formState).error;
}

type FormInputProps = Omit<InputProps, "onChange" | "value" | "ref"> & {
	name: string;
	value: string;
	onChange: (value: string) => void;
	onBlur: Noop;
	disabled?: boolean;
	label?: string;
	description?: string;
	/** react-hook-form passes a focus ref; these forms do not use it. */
	ref?: unknown;
};

/** A react-hook-form field rendered as a HeroUI TextField. */
function FormInput(props: FormInputProps) {
	const error = useFieldError();
	const {
		label,
		description,
		onChange,
		disabled,
		name: _name,
		ref: _ref,
		...inputProps
	} = props;

	return (
		<TextField isInvalid={!!error} isDisabled={disabled}>
			{!!label && <Label>{label}</Label>}
			<Input {...inputProps} onChangeText={onChange} />
			{!!description && <Description>{description}</Description>}
			<FieldError>{error?.message}</FieldError>
		</TextField>
	);
}

export { Form, FormField, FormInput };
