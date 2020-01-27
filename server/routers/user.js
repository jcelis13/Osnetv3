const express = require('express')
const router = new express.Router()
const userModel = require('../database/models/user')

const AUTH_USER_TYPE = 'authenticated'
const COOKIE_OPTIONS = {
  httpOnly: true,
  signed: true
}



router.post('/api/auth/login', async (req, res) => {
  try{
    const user  = await userModel.findByCredentials(req.body.username, req.body.password)
    if(!user) {
      res.status(400).send('invalid username or password')
      
    }
    const userProfile = await userModel.getUserProfile(user.user_id)
    const userTeamId = await userModel.getUserTeamId(user.user_id)
    const searchEmployee = await userModel.searchAllEmployee(userProfile.role_id, userProfile.company_id)
    const userData = {
      user_id: userProfile.user_id,
      name: userProfile.full_name,
      role_id: userProfile.role_id,
      type: AUTH_USER_TYPE,
      team_id: userTeamId.team_id,
      company_id: userProfile.company_id,
    }
    res.cookie('token', userData, COOKIE_OPTIONS);
    res.status(200).json({searchEmployee,userData, userProfile});
  } catch(error) {
    res.json(error)
  } 
    

})

router.post('/api/auth/search_employee', async (req, res) => {
  try{
    const searchSpecificEmployee = await userModel.getSpecificEmployee(req.body.employee_user_id)
    console.log(searchSpecificEmployee.user_id)
    res.status(200).json({searchSpecificEmployee});
  }catch(error){
    res.status(404);
  }
})



router.get('/api/auth/home', async (req, res) => {
  try {
    const { signedCookies = {} } = req;
    const { token } = signedCookies;
    if(token && token.user_id){
      const userProfile = await userModel.getUserProfile(token.user_id)
      const userPosition = await userModel.getUserPosition(token.user_id)
      const userHealthTracker = await userModel.getUserHealthTracker(token.user_id, token.company_id)
      const userTransactions = await userModel.getUserTransactions(token.user_id)
      const userResultDocument = await userModel.getResultDocuments(token.user_id)
      const userNurseVisit = await userModel.getNurseVisit(token.user_id)
      const userSchedule = await userModel.getUserSchedule(token.user_id)
      const userSalaryDetails = await userModel.getUserSalaryDetails(token.user_id)
      const userIncentives = await userModel.getUserIncentives(token.user_id)
      const userHMOplan = await userModel.getUserHMOplan(token.user_id)
      const userHMOdependent = await userModel.getUserHMOdependent(token.user_id)
      const userLoans = await userModel.getUserLoans(token.user_id)
      res.json({userProfile, userPosition, userHealthTracker, userTransactions, userResultDocument, userNurseVisit, userSchedule, userSalaryDetails, userIncentives, userHMOplan, userHMOdependent, userLoans});
      }
  } catch(error) {
    res.status(404);
  }
  
})

router.post('/api/home/post/event', async (req, res) => {
  try{
    const {title, start, end, url, type, duration_start, duration_end, branches} = req.body.eventData;
    const event = await userModel.dbpostEvent(title, start, end, url, type, duration_start, duration_end)
    if(!event) {
      res.status(400)
    }
    branches.forEach(async (branch) => {
      await userModel.dbpostEventLocation(event.insertId, branch.branch_id)
    });
    res.status(200).json(event);  
  } catch(error) {
    res.json(error)
  } 
})

router.post('/api/home/delete/event', async (req, res) => {
  try{
    const {calendar_id} = req.body;
    const event = await userModel.dbEventDelete(calendar_id);
    await userModel.dbEventDeleteLocation(calendar_id);
    if(!event) {
      res.status(400)
    }
    res.status(200).json(event);  
  } catch(error) {
    res.json(error)
  } 
})

router.get('/api/auth/team', async (req, res) => {
  try {
    const { signedCookies = {} } = req;
    const { token } = signedCookies;
    if(token && token.user_id){
      const userTeamMembers = await userModel.getUserTeamMembers(token.team_id)
      res.json({userTeamMembers});
      }
  } catch(error) {
    res.status(404);
  }
  
})

router.get('/api/home', async (req, res) => {
  try {
    // const { signedCookies = {} } = req;
    // const { token } = signedCookies;
    // if(token && token.user_id){
      const initBranches = await userModel.initBranch();
      const eventList = await userModel.dbEventList();
      res.json({initBranches, eventList});
      // }
  } catch(error) {
    res.status(404);
  }
  
})

router.post('/api/home/event/location', async (req, res) => {
  try {
    // const { signedCookies = {} } = req;
    // const { token } = signedCookies;
    // if(token && token.user_id){
      const eventToEdit = await userModel.dbEventToEdit(req.body.calendar_id);
      res.status(200).json({eventToEdit});
      // }
  } catch(error) {
    res.status(404);
  }
  
})

router.get('/api/home/events', async (req, res) => {
  try {
    const { signedCookies = {} } = req;
    const { token } = signedCookies;
    if(token && token.user_id){
      const homeEvents = await userModel.getAllNewsFeed()
      res.json({homeEvents});
      }
  } catch(error) {
    res.status(404);
  }
  
})



router.post('/api/home/event/likes', async (req, res) => {
  try {
    const { signedCookies = {} } = req;
    const { token } = signedCookies;
    const event_id = req.body.event_id;
    if(token && token.user_id){
      const eventLikes = await userModel.getEventLikes(event_id)
      res.json({eventLikes});
      }
  } catch(error) {
    res.status(404);
  }
  
})

router.put('/api/home/event/like', async (req, res) => {
  try {
    const { signedCookies = {} } = req;
    const { token } = signedCookies;
    if(token && token.user_id){
      await userModel.likeEvent(req.body.event_id, req.body.user_id)
        res.status(200).json({success: 'success'});
      }
  } catch(error) {
    res.status(404);
  }
  
})


router.post('/api/auth/update_password', async (req, res) => {
  try {
      const dateNow = new Date();
      await userModel.UpdateUserPassword(req.body.new_password, req.body.user_id)
      await userModel.UpdateUserPasswordCouter(req.body.user_id)
      await userModel.UpdateUserPasswordActivated(req.body.user_id, dateNow)
      res.status(200).json({success: 'success'});
  } catch(error) {
    res.status(404);
  }
  
})



router.post('/api/auth/logout', async (req, res) => {
  res.clearCookie('token', COOKIE_OPTIONS);
  res.sendStatus(204);
})



module.exports = router;