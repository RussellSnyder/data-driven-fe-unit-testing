import './people-table.css';


export default function PeopleTable({ people }) {
  const peopleRows = people.map(({ image, name, email, isRegistered }, i) => (
        <tr key={`${name}${i}`}>
            <td>
              <img src={image} alt={`avatar or ${name}`} />
            </td>
            <td>{name}</td>
            <td>{email}</td>
            <td style={{ color: isRegistered ? 'green' : 'red' }}>
              {isRegistered ? 'Registered' : 'Not Registered'}
            </td>
        </tr>
  ));

  return (
    <table className="people-table">
      <thead>
        <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Is Registered</th>
        </tr>
      </thead>
      <tbody>
        {peopleRows}
      </tbody>
    </table>
  );
}
