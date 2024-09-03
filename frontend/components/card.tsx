import * as React from 'react';
import Image from 'next/image';

class CardComponentProps {
    title: string;
    subtitle: string;
    media?: string;

    constructor(title: string, subtitle: string) {
        this.title = title;
        this.subtitle = subtitle;
    }
}

export default function CardComponent(props: CardComponentProps) {
  return <div className="bg-white">
        <Image
            src={props.media || ""}
            alt="Logo Apice"
            width={100}
            height={101}
            className="flex"
            priority
        />
        <h2>
            {props.title}
        </h2>
        {props.subtitle}
    </div>
}
