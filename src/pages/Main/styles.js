import styled from "styled-components";

export const Form = styled.form`
	/* margin-top: 30px;
	display: flex;
	flex-direction: row; */

	input {
		flex: 1;
		border: 1px solid #eee;
		padding: 10px 15px;
		border-radius: 4px;
		font-size: 16px;
	}

	div {
		margin-top: 30px;
		display: flex;
		flex-direction: row;
	}

	span {
		/* display: inline-block; */
		display: flex;
    align-items: center;
		margin-top: 10px;

		svg {
			margin-right: 5px;
			color: #ffca00;
		}
	}

	button > span {
		margin: 0;
	}
`;

export const SubmitButton = styled.button.attrs(props => ({
	type: 'submit',
	disabled: props.loading
}))`
	background: #7159c1;
	border: 0;
	padding: 0 15px;
	max-width: 44px;
	margin-left: 10px;
	border-radius: 4px;

	display: flex;
	justify-content: center;
	align-items: center;

	&[disabled] {
		cursor: not-allowed;
		opacity: 0.6;
	}

	&:hover {
		opacity: 0.9;
	}
`;

export const List = styled.ul`
	background: #fff;
	border-radius: 4px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
	padding: 30px;
	margin-top: 30px;
	list-style: none;

	li {
		padding: 15px 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		& + li {
			border-top: 1px solid #eee;
		}

		a {
			color: #7159c1;
			text-decoration: none;
		}
	}
`;
