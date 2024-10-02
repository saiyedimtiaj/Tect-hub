import { Skeleton } from "@/components/ui/skeleton"; // Ensure you import the Skeleton component
import { TableCell, TableRow } from "../ui/table";

const SkeletonRow = () => (
    <TableRow>
        <TableCell>
            <Skeleton className="h-12 w-12 rounded-full" />
        </TableCell>
        <TableCell>
            <Skeleton className="h-6 w-28" />
        </TableCell>
        <TableCell>
            <Skeleton className="h-6 w-20" />
        </TableCell>
        <TableCell>
            <Skeleton className="h-6 w-14" />
        </TableCell>
        <TableCell>
            <Skeleton className="h-6 w-14" />
        </TableCell>
    </TableRow>
);
export default SkeletonRow