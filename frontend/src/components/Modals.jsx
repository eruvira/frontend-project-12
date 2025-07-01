import { useSelector } from 'react-redux'

import AddChannelModal from './modals/AddChannelModal'
import RenameChannelModal from './modals/RenameChannelModal'
import RemoveChannelModal from './modals/RemoveChannelModal'

const modalsMap = {
  add: AddChannelModal,
  rename: RenameChannelModal,
  remove: RemoveChannelModal,
}

const Modals = () => {
  const { type } = useSelector((state) => state.modal)

  if (!type) return null

  const SelectedModal = modalsMap[type]

  return <SelectedModal />
}

export default Modals
