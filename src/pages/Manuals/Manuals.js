import { DataTable } from "../../modules/Manuals/DataTable/DataTable"
import { Events } from "../../modules/Manuals/Events/Events"
import { Filters } from "../../modules/Manuals/Filters/Filters"

export const Manuals = ({manuals}) => {
	return (
		<div>
			<Filters/>
			<Events/>
			<DataTable {...{manuals}}/>			
		</div>
	)
}
