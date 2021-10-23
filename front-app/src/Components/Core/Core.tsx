interface CoreProps {
    readonly className?: string;
    readonly enabled?: boolean;
}

type ButtonVariant = "Primary";

interface ButtonProps {
    readonly onClick?: Function;
    readonly variant?: ButtonVariant;
    readonly children: JSX.Element|string;
}

export const Button = (props: ButtonProps&CoreProps) => {

    const {
        className = "",
        enabled = true,
        onClick = () => {},
        variant = "Primary",
        children
    } = props;

    const classes = [
        className,
        "btn"
    ];

    switch (variant) {
        case "Primary":
            classes.push("btn-primary");
            break;
    }

    if (!enabled) {
        classes.push("btn-disabled")
    }

    return <div className={classes.join(" ")} onClick={() => onClick()}>
        {children}
    </div>;
}


interface SliderProps {
    readonly value: number;
    readonly min: number;
    readonly max: number;
    
    readonly step?: number;
    readonly name?: string;
    readonly onValueChanged?: (value: number) => void;
    readonly label?: string;
}

export const Slider = (props: SliderProps) => {

    const { min, max, onValueChanged, value, label, step, name } = {
        onValueChanged: () => {},
        step: 1.0,
        name: 'slider',
        ...props
    };
    return <div className="flex flex-col">
        {label && <label htmlFor={name}>{label}</label>}
        <input type="range"
            name={name} min={min} max={max} step={step}
            value={value} onChange={(e) => onValueChanged(e.target.valueAsNumber)}
        />
    </div>;
}