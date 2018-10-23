import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import Card from 'components/Card'

import { growl } from 'store/ui/actions'

import { fetchQuestions } from 'store/question/actions'
import { getQuestions } from 'store/question'
import { getData } from 'store/user'
import Button from 'components/Button'
import AvailableQuestions from 'components/AvailableQuestions'
import './pendingQuestions.scss'

class PendingQuestions extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    const { profile } = this.props
    await this.props.fetchQuestions(profile.data.professor.id)
  }

  render() {
    console.log(this.props.questions)
    const questions = this.props.questions.filter(
      question => question.approved == false,
    )
    console.log()

    return (
      <div className="flex flex-column">
        <h1 className="flex">Lista de Questões</h1>
        <div className="flex justify-between ">
          <h6 className="listQuestions__h6">Enunciado</h6>
          <h6 className="listQuestions__h6">Data de criação</h6>
        </div>
        <div className="flex flex-column">
          {!!questions ? (
            <AvailableQuestions data={questions} className="flex" />
          ) : (
            <h5 className="text-center listQuestions__h5">
              Você não possui questôes para editar.
            </h5>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  questions: getQuestions(state),
  profile: getData(state),
})

export default connect(
  mapStateToProps,
  dispatch =>
    bindActionCreators(
      {
        fetchQuestions,
        push,
      },
      dispatch,
    ),
)(PendingQuestions)
