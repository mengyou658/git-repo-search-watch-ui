import { ref } from 'vue'

export const markerView = ref({
  show: false,
  location: '',
  title: null,
  addr: null
})
export const onViewMapMarker = (location: string, title?: string, addr?: string) => {
  markerView.value = {
    show: true,
    location,
    title,
    addr
  }
}
export const onViewMapMarkerChange = (show: boolean) => {
  markerView.value.show = show
}

export const markerPick = ref({
  show: false,
  location: ''
})
export default {
  markerPick,
  markerView,
  onViewMapMarker,
  onViewMapMarkerChange
}
