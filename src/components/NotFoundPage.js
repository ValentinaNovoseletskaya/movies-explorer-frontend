import {Link} from 'react-router-dom';

function NotFoundPage() {  
  return (
    <section className="page-error">
      <h2 className="page-error__title">404</h2>
      <p className="page-error__text">Страница не найдена</p>        
      <Link to="/" className="page-error__link">Назад</Link>
    </section>
  );
}

export default NotFoundPage;