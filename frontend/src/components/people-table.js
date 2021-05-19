import './people-table.css';


export default function PeopleTable({ people, hideImageColumn, hideRegistrationColumn }) {
  const peopleRows = people.map(({ image, name, email, isRegistered }, i) => (
        <tr key={`${name}${i}`}>
            {!hideImageColumn && <td>
              {image ? <img src={image} alt={`avatar or ${name}`} /> : 'no image available'}
            </td>}
            <td>{name}</td>
            <td>{email}</td>
            {!hideRegistrationColumn && <td style={{ color: isRegistered ? 'green' : 'red' }}>
              {isRegistered ? 'Registered' : 'Not Registered'}
            </td>}
        </tr>
  ));

  return (
    <table className="people-table">
      <thead>
        <tr>
            {!hideImageColumn && <th>Image</th>}
            <th>Name</th>
            <th>Email</th>
            {!hideRegistrationColumn && <th>Is Registered</th>}
        </tr>
      </thead>
      <tbody>
        {peopleRows}
      </tbody>
    </table>
  );
}
