export const GoogleMapsScript = () => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  return (
    <script
      async
      defer
      src={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`}
    ></script>
  )
}
