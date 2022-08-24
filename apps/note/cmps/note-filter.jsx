const {NavLink} = ReactRouterDOM

export class NoteFilter extends React.Component {





    render (){
       return<section className="note-filter">
       <NavLink to="/note/all" ><div className="filter-btn" onClick={()=>this.props.onFilterChange('')}> All Notes </div></NavLink>
       <NavLink to="/note/text"><div className="filter-btn" onClick={()=>this.props.onFilterChange('text')}> Texts </div></NavLink>
       <NavLink to="/note/todo"><div className="filter-btn" onClick={()=>this.props.onFilterChange('todo')}> Todos </div></NavLink>
       <NavLink to="/note/image"><div className="filter-btn" onClick={()=>this.props.onFilterChange('image')}> Images </div></NavLink>
       <NavLink to="/note/video"><div className="filter-btn" onClick={()=>this.props.onFilterChange('video')}> Videos </div></NavLink>
   </section>
    }
   }