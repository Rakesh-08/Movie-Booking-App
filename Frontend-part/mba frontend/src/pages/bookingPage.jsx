import { useNavigate } from "react-router-dom"

export default function BookingPage() {

    let NavigateTo = useNavigate();

    return (
      <div>
        <div className='mx-2 p-2'>
          <p
            onClick={() => NavigateTo("/")}
            className="text-uppercase display-6 p-2 text-primary fst-italic w-25 moviecard "
          >
            Filmy Duniyah
          </p>
        </div>
      </div>
    );
}