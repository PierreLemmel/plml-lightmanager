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