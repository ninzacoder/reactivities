import React from 'react';

export default function DuckItem(props: any){
    return (
        <div key={props.name}>
        <span>{props.name}</span>
        <button onClick={() => props.duck.makeSound(props.name + 'quack')}>Make sound</button>
      </div>
    )
}