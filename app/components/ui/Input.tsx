import { cn } from '@/lib/utils';

import { HTMLAttributes, Ref, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { VariantProps, cva } from 'class-variance-authority';
import { FC } from 'react';
import Paragraph from './Paragraph';
import useMultiForm from '@/lib/useMultiForm';
import { Button } from './Button';

const InputVariants = cva(
	'peer flex disabled:pointer-events-none outline-none rounded-none border border-neutral-600 rounded relative invalid:border-r-600',
	{
		variants: {
			variant: {
				default: 'bg-transparent text-neutral-300 placeholder-neutral-400 bg-neutral-700',
			},
			size: {
				default: 'h-10 px-2 w-full',
			},
		},
		defaultVariants: {
			size: 'default',
			variant: 'default',
		},
	}
);

interface InputProps extends HTMLAttributes<HTMLInputElement>, VariantProps<typeof InputVariants> {
	disabled?: boolean;
	type: string;
	incrementButtons?: boolean;
	increment?: (setThing: Function) => number;
	decrease?: (setThing: Function) => number;
	visible?: boolean;
	title?: string;
	value?: string | number;
}

const TextInput = forwardRef<HTMLInputElement, InputProps>(
	({ size, variant, visible, className, value, title, children, disabled, type, ...props }, ref) => {
		useEffect(() => {
			textbox.current.value = value;
		}, [value]);

		const textbox = useRef<any>(<input />);

		useImperativeHandle(ref, () => textbox.current);

		return (
			<div className={cn(`${visible === false ? 'hidden' : 'block'} relative bg-gradient-to-r 500 pb-0.5 `, className)}>
				<input
					required
					disabled={disabled}
					className={cn(InputVariants({ size, variant }))}
					onClick={(e: any) => e.stopPropagation()}
					ref={textbox}
					{...props}
				/>
				<span
					data-before={title}
					className={`pointer-events-none text-neutral-400 peer-placeholder-shown:-top-2 disabled:pointer-events-none outline-none text-sm absolute top-1/4 left-2 point peer-focus:text-xs peer-valid:text-xs placeholder-shown:text-xs  peer-placeholder-shown:text-xs peer-focus:-top-2 z-10 peer-valid:-top-2 transition-all px-1 before:content-[attr(data-before)] before:top-[8px] before:bg-neutral-700 before:-z-10 before:px-1 before:left-[1px] before:absolute before:text-transparent before:h-[2px]`}
				>
					{title}
				</span>
			</div>
		);
	}
);
TextInput.displayName = 'Text Input';

const NumberInput = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			size,
			variant,
			visible,
			className,
			title,
			children,
			disabled,
			incrementButtons,
			increment,
			decrease,
			type,
			value,
			...props
		},
		ref
	) => {
		const [thing, setThing] = useState<number>(parseInt(value!.toString()) ?? 0);

		useEffect(() => {
			textbox.current.value = value;
		}, [value]);

		const textbox = useRef<any>(<input />);

		useImperativeHandle(ref, () => textbox.current);

		return (
			<div className={cn(`${visible === false ? 'hidden' : 'block'} relative pb-0.5 flex `, className)}>
				{incrementButtons ? (
					<Button onClick={() => (thing > 0 ? decrease?.(setThing) : 0)} className="px-8  rounded-none rounded-l h-10">
						-
					</Button>
				) : null}
				<input
					required
					disabled={disabled}
					pattern="[0-9]*"
					className={cn(InputVariants({ size, variant }), `${incrementButtons ? 'rounded-none' : ''}`)}
					placeholder={thing.toString()}
					{...props}
					ref={textbox}
				/>
				{/* <span
				className={`text-t-950 disabled:pointer-events-none outline-none text-sm absolute top-0 ${
					incrementButtons ? 'left-20' : 'left-2'
				} peer-focus:text-xs peer-focus:bg-t-400 peer-focus:-top-2 peer-valid:text-xs peer-valid:bg-t-400 peer-valid:-top-2 transition-all peer-placeholder-shown:text-xs  peer-placeholder-shown:-top-2 peer-placeholder-shown:bg-t-400 px-1`}
			>
				{title}
			</span> */}
				<span
					data-before={title}
					className={`text-neutral-400 disabled:pointer-events-none outline-none text-sm absolute top-1/4 ${
						incrementButtons ? 'left-20' : 'left-2'
					} point peer-focus:text-xs peer-valid:text-xs placeholder-shown:text-xs peer-placeholder-shown:-top-2 peer-placeholder-shown:text-xs peer-focus:-top-2 z-10 peer-valid:-top-2 transition-all px-1 before:content-[attr(data-before)] before:top-[8px] before:bg-neutral-700 before:-z-10 before:px-1 before:left-[1px] before:absolute before:text-transparent before:h-[2px]`}
				>
					{title}
				</span>

				{incrementButtons ? (
					<Button onClick={() => increment?.(setThing)} className="h-10 px-8 rounded-none rounded-r">
						+
					</Button>
				) : null}
			</div>
		);
	}
);
NumberInput.displayName = 'Text Input';

interface ToggleProps extends HTMLAttributes<HTMLDivElement> {
	toggled: boolean;
	children?: Array<any>;
	disabled?: boolean;
	description?: string;
	showChildren?: boolean;
	title?: string;
	hoverColor?: string;
	checkbox?: boolean;
}

const Toggle = forwardRef<HTMLDivElement, ToggleProps>(
	(
		{ showChildren, description, title, children, toggled, disabled, className, checkbox, hoverColor, ...props },
		ref
	) => {
		return (
			<div
				ref={ref}
				className={cn(
					`border ${
						toggled ? `border-neutral-600 bg-neutral-600/50` : 'border-slate-400'
					} rounded transition-all cursor-pointer ${className}`
				)}
			>
				<div className="flex items-center justify-between p-2 " {...props}>
					{checkbox && (
						<div className="rounded border-2 p-1 border-t-100 bg-t-100/5">
							<Check className={`w-5 h-5 text-t-100 ${toggled ? 'scale-100' : 'scale-0'}`} />
						</div>
					)}
					<div className="p-1">
						<Paragraph className={`px-0 select-none text-t-100 font-bold ${checkbox ? 'text-right' : 'text-left'} mb-0`}>
							{title}
						</Paragraph>
						<Paragraph
							size={'sm'}
							className={`px-0 select-none text-t-200 leading-normal ${checkbox ? 'text-right' : 'text-left'} mb-0`}
						>
							{description}
						</Paragraph>
					</div>
				</div>

				{children !== undefined && toggled && (
					<div className="px-3 py-4 bg-neutral-800 flex gap-3 flex-col rounded-b-md">
						{children.map((input, i) => {
							return (
								<FormInput key={i} className="mx-1 mb-0" {...input}>
									{input.children}
								</FormInput>
							);
						})}
					</div>
				)}
			</div>
		);
	}
);
Toggle.displayName = 'Toggle';

interface CarouselProps extends HTMLAttributes<HTMLDivElement> {}

const CarouselSelector: FC<CarouselProps> = ({ className }) => {
	return <div className={`bg-indigo-100 ${className}`}>s</div>;
};
CarouselSelector.displayName = 'Carousel';

// lets make a selector, left and right thingy.
const formInputSwitch = (type: string, children: any, title: any, ref: any, props: any) => {
	switch (type.toLowerCase()) {
		case 'text':
			return (
				<TextInput ref={ref} title={title} {...props}>
					{children}
				</TextInput>
			);
		case 'toggle':
			return (
				<Toggle ref={ref} title={title} {...props}>
					{children}
				</Toggle>
			);
		case 'number':
			return (
				<NumberInput ref={ref} title={title} {...props}>
					{children}
				</NumberInput>
			);
		case 'carousel':
			return <CarouselSelector {...props}></CarouselSelector>;
		case 'message':
			return (
				<Paragraph className="self-center m-0 text-t-100" size={'xs'}>
					{title}
				</Paragraph>
			);
		default:
			return <TextInput {...props}>{children}</TextInput>;
	}
};

interface FormInputProps extends HTMLAttributes<HTMLAllCollection> {
	disabled?: boolean;
	value?: string | number;
	type: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({ children, type, title, ...props }, ref) => {
	return formInputSwitch(type, children, title, ref, props);
});
FormInput.displayName = 'Input';

export default FormInput;
