import {Link} from "react-router-dom";

function BookItem(props) {
    return (
        <tr>
            <td>{props.book.name}</td>
            <td>{props.book.author.name} {props.book.author.surname}</td>
            <td>{props.book.category}</td>
            <td>{props.book.availableCopies}</td>
            <td className={"text-right"}>
                <a title={"Delete"} className={"btn btn-danger"}
                   onClick={() => props.onDelete(props.book.id)}>Delete</a>

                <a title={"Edit"} className={"btn btn-warning"}
                   href={`/books/edit/${props.book.id}`}>Edit</a>

                <a title={"MarkAsTaken"} className={"btn btn-primary"}
                   onClick={() => props.onDecrement(props.book.id)}>Mark as taken</a>
            </td>

            {/*    <Link className={"btn btn-info ml-2"}*/}
            {/*          onClick={() => props.onEdit(props.item.id)}*/}
            {/*          to={`/products/edit/${props.item.id}`}>*/}
            {/*        Edit*/}
            {/*    </Link>*/}
            {/*</td>*/}
        </tr>
    );
}

export default BookItem