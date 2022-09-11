import './App.css';

import { useState, useRef } from 'react';

import React from 'react'

const obj = { title: "Перетащи меня" }

const holders = [
  { id: 1, title: "Начать", class: "col-header start", items: [obj] },
  { id: 2, title: "В процессе", class: "col-header progres", items: [] },
  { id: 3, title: "Готово", class: "col-header donee", items: [] }
]

function Drug() {
  const [state, setState] = useState(null)
  const [hold, setHold] = useState(holders)

  function drugstart(event, item) {
    event.target.className = "item hold"
    setState(item)
    setTimeout(() => event.target.className = "item hide", 0);
  }

  function drugend(event) {
    event.target.className = "item";
  }

  function dragover(event, at) {
    event.preventDefault();
  }

  function dragenter(event) {
    event.target.className = "placeholder hovered";

  }

  function dragleave(event) {
    event.target.className = "placeholder";
  }

  function dragdrop(event, item) {
    event.preventDefault()
    event.target.className = 'placeholder'
    setHold(
      holders.map((holder) => {
        if (holder.id === state.id) {
          holder.items = []
        }
        if (holder.id === item.id) {
          holder.items.push(obj)
        }
      })
    )

  }


  return (
    <div className='body' >

      {holders.map((item) => {
        return (
          <div key={item.id}>
            <div className="row">
              <div className={item.class}>
                {item.title}
              </div>
            </div>

            <div className="row">
              <div className='placeholder'
                id={item.id}
                onDragOver={(e) => dragover(e)}
                onDragEnter={(e) => dragenter(e)}
                onDragLeave={(e) => dragleave(e)}
                onDrop={(e) => dragdrop(e, item)}>
                {
                  item.items.length > 0 ? <div
                    className='item'
                    draggable="true"
                    onDragStart={(e) => drugstart(e, item)}
                    onDragEnd={e => drugend(e)}>{item.items[0]?.title}</div> : null
                }
              </div>
            </div>
          </div>)
      })}
    </div >
  )
}

export default Drug