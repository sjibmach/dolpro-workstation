import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';

const RHFInput = ({
    control,
    name,
    label,
    description,
    placeholder,
    showError = true,
    type,
    ...props
}: {
    control: Control<any>;
    name: string;
    label?: string;
    description?: string;
    placeholder?: string;
    showError?: boolean;
    type?: string;
} & React.ComponentProps<'input'>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            type={type}
                            {...props}
                            onChange={e => {
                                const value = e.target.value;
                                const parsedValue =
                                    type === 'number'
                                        ? value === ''
                                            ? undefined
                                            : Number(value)
                                        : value;
                                field.onChange(parsedValue);
                            }}
                        />
                    </FormControl>
                    {description && (
                        <FormDescription>{description}</FormDescription>
                    )}
                    {showError && <FormMessage />}
                </FormItem>
            )}
        />
    );
};

export default RHFInput;
