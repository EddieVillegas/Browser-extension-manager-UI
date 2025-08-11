type Props = {
    img: string
}

export default function Logo({ img }: Props) {
    return(
        <img src={img} alt="logo" />
    )
}