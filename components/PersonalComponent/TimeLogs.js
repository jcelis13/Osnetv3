import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Calendar from "../../components/Calendar/index"

const StyledContainer = styled.div`
  margin-top: 20px;
  padding: 5px;
`;
const StyledTable = styled.table`
  margin-top: 10px;
  width: 100%;
  border: solid 1px #ddeeee;
  border-collapse: collapse;
  border-spacing: 0;
`;
const StyledTh = styled.th`
  background-color: #ff8533;
  border: solid 1px #f2f2f2;
  color: white;
  padding: 10px;
  text-align: left;
  border: none;
`;
const StyledTd = styled.td`
  border: solid 1px #f2f2f2;
  color: #333;
  padding: 10px;
  text-shadow: 1px 1px 1px #fff;
`;
const StyledReminder = styled.span`
  color: red;
  font-style: italic;
  font-size: 10px;
`;
class TimeLogs extends React.Component {
  render() {
    const userSchedule = ({} = this.props.userSchedule || {});
    return (
      <StyledContainer>
        <Calendar/>
        
        <StyledTable>
          <tr>
            <StyledTh colSpan="4">Time Logs</StyledTh>
          </tr>
          <tr>
            <StyledTd>Days</StyledTd>
            <StyledTd>Time-In</StyledTd>
            <StyledTd>Time-out</StyledTd>
          </tr>
          <tr>
            <StyledTd >{userSchedule.days}</StyledTd>
            <StyledTd >{userSchedule.time_in}</StyledTd>
            <StyledTd >{userSchedule.time_out}</StyledTd>
          </tr>
        </StyledTable>
        
      </StyledContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    userSchedule: state.user.userSchedule
  }
}

export default connect(mapStateToProps)(TimeLogs);
