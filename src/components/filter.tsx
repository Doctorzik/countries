
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


type filterProps = {
  regions: string[] | undefined,
  setSelectedItem: (e: string) => void


}



function Filter({ regions, setSelectedItem, }: filterProps) {


  const handleSelect = (e: string) => {
    setSelectedItem(e)

  }


  return (
    <>
      <Select onValueChange={(e) => handleSelect(e)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by region" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Regions</SelectLabel>
            {regions?.map((region: string) => (
              <SelectItem key={region} value={region}>{region}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}



export default Filter