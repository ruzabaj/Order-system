import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client';
import uuid from 'uuid-random';
import Card from './Card';
import Search from './Search';

const Order = () => {
    const [list, setList] = useState([]);
    const [outletName, setOutletName] = useState("")
    const outlet_ref = useRef(outletName)
    const [show, setShow] = useState(true)
    const [id, setId] = useState("")
    const room_id_ref = useRef(id)
    const [hash, setHash] = useState("");
    const hash_ref = useRef(hash)
    const list_ref = useRef(list)
    let url = process.env.REACT_APP_SOCKET_URL
    const [socket, setSocket] = useState(null)
    useEffect(() => {
        if(!socket){
        console.log("here")
        var newSocket = io(`${url}`, {
            transports: ['websocket'],
            upgrade: false,
            cors: {
                origin: "*"
            },
            forceNode: true,
        })
        newSocket.on('connect', () => {
            console.log(newSocket)
            setSocket(newSocket)
        });
   
    }
    return () => newSocket.close();
    }, [])
   
   
    useEffect(() => {
        let uid = uuid();
        setId(uid)
    }, [])
    useEffect(() => {
        list_ref.current = list;
    }, [list])
   
  
    const updateList = (data) => {
        console.log(data, "inside update list");
        setList(current => [...data]);
    }
    useEffect(() => {
        if (socket?.connected){
        socket.on('message', (msg) => {
            socket.emit("get_live", { roomId: `${room_id_ref.current}`, outlet_name: `${outlet_ref.current}` })
            let received_hash = msg.update_endpoint || ""
            setHash(received_hash)
            hash_ref.current = received_hash
        })
        socket.on('disconnect', () => {
            console.log('Disconnected');
            socket.removeAllListeners();
            window.location.reload();
        });
    }
    }, [socket])
   
useEffect(() => {
    if (socket?.connected){
    socket.on('get_live_error', (msg) => {
        setShow(false)
    })
    socket.on(hash_ref.current, (msg) => {
        let list_items = list_ref.current;
        if (!msg) {
            return;
        }
        setShow(true)
        let new_list = [msg, ...list_items]
        updateList(new_list)
    })
    let errorArray = ["quantity_error", "itemresponse_error", "itemvoid_error", "orderseen_error", "tablevoid_error"]
    errorArray.map(e => {
        socket.on(`${hash_ref.current}${e}`, (error) => {
        })
    })
    socket.on(`${hash_ref.current}table_response`, (res) => {
        let list_items = list_ref.current;
        let newList = list_items.filter(el => el.table_id !== res.table_id)
        updateList(newList);
    })
    socket.on(`${hash_ref.current}orderseen_response`, (res) => {
        console.log(res)
    })
    socket.on(`${hash_ref.current}tablevoid_response`, (res) => {
        console.log(res)
    })
    socket.on(`${hash_ref.current}item_response`, (res) => {
        console.log(res)
        socket.emit("get_live", { roomId: `${room_id_ref.current}`, outlet_name: `${outlet_ref.current}` })
        let itemCount = res.item_count;
        console.log(itemCount)
        if (itemCount === 0) {
            console.log("R4EMOVE THIS TABLE FROM FRONTEND")
            socket.emit("get_live", { roomId: `${room_id_ref.current}`, outlet_name: `${outlet_ref.current}` })
            setList(current => []);
        }
    })
   
    socket.on(`${hash_ref.current}itemvoid_response`, (res) => {
        socket.emit("get_live", { roomId: `${room_id_ref.current}`, outlet_name: `${outlet_ref.current}` })
        let itemCount = res.item_count;
        console.log(itemCount)
        if (itemCount === 0) {
            console.log("R4EMOVE THIS TABLE FROM FRONTEND")
            socket.emit("get_live", { roomId: `${room_id_ref.current}`, outlet_name: `${outlet_ref.current}` })
            setList(current => []);
        }
    })
    socket.on(`${hash_ref.current}quantity_response`, (res) => {
        let list_items = list_ref.current;
        const listIndex = list_items.map(i => i.table_id).indexOf(res.table_id);
        let arr_index;
        listIndex < 0 ? arr_index = list_items.length - listIndex : arr_index = listIndex;
        let clickedList = list_items[arr_index];
        let index = Object.keys(clickedList["OrderItemDetailsList"]).findIndex(key => clickedList["OrderItemDetailsList"][key].item_id === res.item_id);
        let newlist = list_items;
        newlist[arr_index].OrderItemDetailsList[index].Quantity = res.quantity;
        updateList(newlist);
    })
    socket.on(`${hash_ref.current}orderseen_response`, (res) => {
        console.log("res of orderseen_response", res.table_id)
        let listItems = list_ref.current;
        console.log(listItems, "list Items")
        let TableId = res.table_id;
        const listIndex = listItems.map(i => i.table_id).indexOf(TableId);
        let currentList = listItems[listIndex]
        console.log("selected list", currentList)
        socket.emit("get_live", { roomId: `${room_id_ref.current}`, outlet_name: `${outlet_ref.current}` })
    })
    socket.on('initial_load', (res) => {
        console.log(res, "initial load")
        setShow(true)
        if (!res) {
            setShow(false)
            updateList([])
            return;
        }
        let { data } = JSON.parse(res)
        console.log("=>", data)
        setList(data)
    })
    socket.on("error", (error) => {
        console.log("error")
        console.log(error)
    })
    }
}, [hash])

    const handleEnter = () => {
        outlet_ref.current= outletName
        room_id_ref.current= id
        socket.emit('join', {
            userName: `${outletName}`,
            roomCode: `${id}`
        })
    }

    const handleChange = (event) => {
        setOutletName(event.target.value)
    }
    const handleCompleted = (item) => {
        socket.emit("table_done", {
            roomId: `${id}`,
            table_id: `${item}`,
            hash: `${hash}`
        })
    }
  
    const handleFinished = (item) => {
        console.log("inside handle finished", item);
        socket.emit("item_complete", {
            roomId: `${id}`,
            item_id: `${item}`,
            hash: `${hash}`
        })
    }
    const handleCancel = (item) => {
        console.log('inside handle cancel/void')
        socket.emit("item_void", {
            roomId: `${id}`,
            item_id: `${item}`,
            hash: `${hash}`
        })
    }
    const handleMinus = (item) => {
        console.log("inside handle minus")
        socket.emit("quantity_decrease", {
            roomId: `${id}`,
            item_id: `${item}`,
            hash: `${hash}`
        })
    }
    const handleCookProcess = (tableId) => {
        socket.emit("order_seen", {
            roomId: `${id}`,
            table_id: `${tableId}`,
            hash: `${hash}`
        })
    }
    return (
        <div className="row">
            <Search handleChange={handleChange} handleEnter={handleEnter} />
            {!show && <><div>Error! Please check the outlet name.</div></>}
            {show && list.map((element, index) => (
                <Card element={element} handleFinished={handleFinished} handleCookProcess={handleCookProcess} handleCompleted={handleCompleted} handleMinus={handleMinus} handleCancel={handleCancel} index={index} />
            ))}
        </div>
    )
}
export default Order