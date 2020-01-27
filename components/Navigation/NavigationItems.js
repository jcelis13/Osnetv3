import React, { Component } from "react";
import { connect } from 'react-redux'
import Link from "next/link";
import styled from "styled-components";
import { logOutUser } from "../../lib/Auth";
import * as actions from '../../store/actions/index';
import SearchEmployee from '../../components/PersonalComponent/SearchEmployee'


const StyleUL = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-flow: column;
  align-items: center;
  height: 100%;

  @media (min-width: 500px) {
    flex-flow: row;
  }
`;
const StyledLI = styled.li`
    margin: 10px 0;
    box-sizing: border-box;
    display: block;
    width: 100%;
  @media (min-width: 500px) {
      margin: 0;
      display: flex;
      height: 100%;
      width: auto;
      align-items: center;`;

const StyledA = styled.a`
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-timing-function: ease-in-put;
  transition-timing-function: ease-in-put;
  cursor: pointer;
  color: black;
  text-decoration: none;
  width: 100%;
  box-sizing: border-box;
  display: block;

  :hover,
  :active,
  :active {
    transform: scale(1.2);
  }
  
  color: black;
  height: 100%;
  padding: 16px 10px;
  border-bottom: 4px solid transparent;

  :hover,
  :active,
  :active {
    transform: scale(1.1);
  }
`;
const StyledAFiltered = styled.a`
height:100%;
position: relative;
display: block;
padding:12px;
background: white;
color: dimgrey;
font-size: 14px;
text-decoration: none;
transition: all 0.2s ease-in-out;
text-align: left;
-webkit-transition: all 0.3 ease;
transition: all 0.3 ease;
cursor: pointer;
-webkit-transition-duration: 0.4s; /* Safari */
transition-duration: 0.1s;
&:hover,
&:active,
&:focus {
    background: #f2f2f2;
    box-shadow: inset 2px 0px 10px -5px rgba(0, 0, 0, 0.8);
    color: red;
  }
`;

const StyledInput = styled.input`
 
  border: none;
  border-color: transparent;
  outline: none;

`;
const StyledDropdown = styled.div`
  position: relative;
  display: inline-block;
`;
const StyledDropdownContent = styled.div`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  position: absolute;
  width: 150px;
  z-index: 600;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
`;
class NavigationItems extends Component {
  
  container = React.createRef();
  state = {
    open: false,
    show: false,
    search: '',
    employee_id:''

  };
  changeHandler = event => {

    this.setState({ search: event.target.value});
    this.setState({show: true})
    

  }
  onClickHandler = (names) => {
    event.preventDefault();
    this.props.onSearch(names.user_id)
    console.log('emp', names.user_id);
    this.setState({show: false})
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  handleClickOutside = event => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.setState({
        open: false,
        show: false,
      });
      
    }
  };



  handleLogout = () => { 
    this.props.onLogout();
  }
  render() {
    
    const searchEmployees = ([] = this.props.searchEmployees || []);
    const userProfile  = ({} = this.props.userProfile || {});
    
    const filteredNames = searchEmployees.filter((searchEmployee) =>  searchEmployee.first_name ? searchEmployee.first_name.toLowerCase().includes(this.state.search.toLowerCase()) : null);

    const handlerButtonClick = () => {
      this.setState(state => {
        return {
          open: !state.open,
         
        };
      });
    };

    return (
      <nav ref={this.container}>
        <StyleUL>
          <StyledLI>
              <StyledDropdown >
                <StyledA >
                  <StyledInput
                    value = {this.state.search}
                    name="search"
                    autoComplete = "off"
                    onChange = {this.changeHandler}
                    type="text" 
                    placeholder="Search...">
                  </StyledInput>
                </StyledA>
                 {this.state.show && (
                 
                <StyledDropdownContent>
                      {filteredNames.slice(0, 10).map((names) =>(
                     <Link href="/searchemployee">
                              <StyledAFiltered key={names.user_id} onClick={() => this.onClickHandler(names)}>
                                 
                                  {names.first_name + " " + names.last_name}
                              </StyledAFiltered>
                     </Link> 
                          ))}
                   
                      </StyledDropdownContent>
                )} 
                {/* <SearchEmployee
                  data = {this.state.employee_id}
              />   */}
              </StyledDropdown>
            <StyledDropdown >
              <StyledA onClick={handlerButtonClick}>
                {userProfile.full_name}
              </StyledA>
              {this.state.open && (
                <StyledDropdownContent id="myDropdown">
                  <Link href="/personal">
              <StyledA>Personal</StyledA>
                  </Link>
                  <StyledA onClick={this.handleLogout}>Logout</StyledA>
                </StyledDropdownContent>
              )}
            </StyledDropdown>
          </StyledLI>
        </StyleUL>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    userProfile: state.auth.userProfile,
    searchEmployees: state.auth.searchEmployee
  }
  
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.actLogout()),
    onSearch: (employee_user_id) => dispatch(actions.search(employee_user_id))
  
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems);
