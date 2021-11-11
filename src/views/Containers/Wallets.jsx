import React, { useState, useContext } from 'react';

  import { TbWalletPanel, TbModal } from '../../components/index'

import { Wallet as StaticWallet } from '../../util/static';
// import { TabPanel } from '../../util/static';
// eslint-disable-next-line no-unused-vars
import { req, clearRequests } from '../../util/request';
import { toFormatDate } from '../../util/api';

import WebSocketData from '../../components/WebSocketData';
import { Info } from '../../components/DetailedInfo'
import { Table } from '../../components/ModalForm/Table';

import DataContext from '../../util/DataContext'

import { sendMessage, GenerateUniqueId } from '../../util/api'
import  MessageContext from '../../util/MessageContext'
import SocketContext from '../../util/socket'

export default function Wallets({...props}) {
  // eslint-disable-next-line no-unused-vars
  const [context, setDataContext] = useContext(DataContext)

  const [modalFull, setModalFull] = useState(false)
  const [modalWallet, setModalWallet] = useState(false)
  const [modalWalletInfo, setModalWalletInfo] = useState(false)
// eslint-disable-next-line no-unused-vars
  const [messageIds, setMessagesContext ] = useContext(MessageContext)
  // eslint-disable-next-line no-unused-vars
  const [socket, setSocket ] = useContext(SocketContext)
  
  const handleSendPeriod = (date1, date2) => {
    console.log('FILTER - ', date1, date2)
  }

  const filterPeriodObj = {
    onSendPeriod: handleSendPeriod,
  }

  const handleClickModal = (e) => {
    e === 0? updateWalletOperationInfo(true) : e === 1? setModalWalletInfo(true) : setModalWallet(true)
  }

  function updateWalletOperationInfo () {
  // чет не работает, надо поправить
  //   if (clearRequests.indexOf(request.request_type) !== -1) {
  //     setDataContext({...context, [request.request_type] : {} })
  // }

    let id = GenerateUniqueId()
    sendMessage(socket, JSON.stringify({message_id: id, request: {}, request_type: ""}))
    setMessagesContext(oldArray => [...oldArray, { message_id: id, request_type: "" } ])
    setModalFull(true) 
}

  const walletData = StaticWallet.walletPanel
  return (
      <>
    { walletData.map((item, index) => {
        let walletRequest = req[item.walletType]
        return  <div className={`col-md-12 ${item.styleWalletBlock}`} key={index}>
                    <TbPanelBlock inPadding=''>
                    <WebSocketData {...walletRequest} render={(data) => (
                        <TbWalletPanel
                            walletName={item.walletName}
                            walletRemainder={data.textStatus}
                            BtnWalletData={item.BtnWalletData}
                            isId={item.isId}
                            isBalance={item.isBalance}
                            labelModal={item.btnRoundText}
                            action={handleClickModal}
                        />
                    )}/>
                    </TbPanelBlock>
                     </div>
    })}
                    <WebSocketData render={(data) => (
                    <TbModal
                      show={modalFull}
                      closeButton={true}
                      onHide={() => setModalFull(false)}
                      dialogClass="modal-fullscreen"
                    >
                      <Table
                        title=''
                        paging={false}
                        data={data.data ? toFormatDate(data.data) : []}
                        columns={StaticWallet.walletModal[0].columns}
                        route={'wallet'}
                        pageSize={20}
                        filterPeriod={filterPeriodObj}
                      />
                    </TbModal>
                    )}/>
                    <TbModal
                      sizeModal = 'lg'
                      show={modalWalletInfo}
                      onHide={() => setModalWalletInfo(false)}
                      >
                      <Info
                        columns={StaticWallet.walletModal[1].fields}
                        infoStyle={'wallets-info ps-3'}
                      />
                      <Table
                        title='Серии'
                        header={false}
                        paging={false}
                        search={false}
                        columns={StaticWallet.walletModal[1].columns}
                        route={'wallet'}
                      />
                    </TbModal>
                    <TbModal
                      sizeModal = 'lg'
                      label=''
                      show={modalWallet}
                      onHide={() => setModalWallet(false)}
                      >
                      <Info
                        columns={StaticWallet.walletModal[2].fields}
                        infoStyle={'wallets-info ps-3'}
                      />
                      <Table
                        title=''
                        header={false}
                        paging={false}
                        search={false}
                        columns={StaticWallet.walletModal[1].columns}
                        route={'wallet'}
                      />
                    </TbModal>
    </>
  )
}